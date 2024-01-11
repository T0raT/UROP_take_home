import React, { useEffect, useState } from "react";
import { Button } from "../components/Button";
import { usePlayer } from "@empirica/core/player/classic/react";
import { useRef } from "react";

export function SalesResults({roundNumber}) {
  console.log('calculating advertiser score');
  const player = usePlayer();
  const roundNumberText = 'round' + roundNumber;
  
  //const adQuality = player.get("adQuality");
  const productionQuality = player.get(roundNumberText.concat("_choices"))[0]
  const advertisementQuality = player.get(roundNumberText.concat("_choices"))[1]
  const priceOfProduct = player.get(roundNumberText.concat("_choices"))[2]
  const productionCost = player.get(roundNumberText.concat("_choices"))[3]
  
  const WarrantPrice = player.get(roundNumberText.concat("_choices"))[4]
  const WarrantChoice = player.get(roundNumberText.concat("_choices"))[5]

  let imageUrl = "";
  //console.log('roundNumberText', roundNumberText)
  if (advertisementQuality === "high") {
    imageUrl = "/images/toothpaseamazing.jpg"; // Replace with the actual URL for high quality
  } else if (advertisementQuality === "low") {
    imageUrl = "/images/toothpastestandard.jpg"; // Replace with the actual URL for low quality
  }

  const currentScore = player.get("score") || 0; // , adQuality, points, salesScore, numBuyers
  
  //let points = 10;
  // Question: What does points do?
  let points = priceOfProduct

  const min = 10;
  const max = 90;
  
  //  switch (advertisementQuality){
  //    case "high":
  //      switch (priceOfProduct) {case "high": min = 50; break; case "low": min = 70; break;
  //      };
  //    case "low":
  //      switch (priceOfProduct) {case "high": min =10, max=20; break; case "low": min = 50, max = 80; break;}
  //  }

  const numBuyers = Math.floor((Math.random() * (max - min ) + min)) ;

  // Warrant RNG logic goes here
  /* 
    Case 1: ad = product, you get extra on top of refund
    Case 2: ad = high, product = low, you lose 90% of the round money 
    Case 3: ad = low, product = high, you get refund warrant money
    */

  let salesScore = (numBuyers * (priceOfProduct - productionCost));
  let finalScore = currentScore + salesScore;


  let newSalesScore = 0 + salesScore;
  let newFinalScore = 0 + finalScore;
  let WarrantChallenge = Math.random() <= 0.3 && WarrantChoice;
  if (WarrantChallenge) {
    console.log("Warrant challenge set to true.")
  }
  
  let challengeCond = 0;

  if (WarrantChallenge) {
    if (productionQuality === "low" && advertisementQuality === "high") {
      challengeCond = 1;
      console.log("Warrant was fraud!")
      newSalesScore = Math.floor(newSalesScore * 0.1);
      newFinalScore = currentScore + newSalesScore - WarrantPrice;
      console.log("Warrant challenged. New sales score: ", newSalesScore);
      console.log("Warrant challenged. New final score: ", newFinalScore);
    } else if (productionQuality === "high" && advertisementQuality === "low") {
      challengeCond = 1;
      console.log("Warrant is ok! Money refunded.")
      console.log("Warrant challenged. New sales score: ", newSalesScore);
      console.log("Warrant challenged. New final score: ", newFinalScore);
    } else {
      challengeCond = 2;
      console.log("Warrant is real, refunded plus extra 25% of round score.")
      newSalesScore += Math.floor(newSalesScore * 0.25);
      newFinalScore = currentScore + newSalesScore;
    }
  } else if (WarrantChoice){ // In the case that you weren't challenge but you still have a warrant
    salesScore -= WarrantPrice*0.5;
    finalScore = currentScore + salesScore;
  }




  function handleSubmit() {
    console.log('Moving on from results round');
    player.stage.set("submit", true);
    if (challengeCond === 1 || challengeCond === 2) {player.set("score", newFinalScore);}
    player.set("score", finalScore);
  }

  // TODO: Different HTML for different results dependent on warrant choice and challenge
  // This is ugly as hell but it sure works!
  // This is REALLY ugly but again it works!
  
  if (challengeCond === 1) { //Case of warrant challenge: Mismatching quality
    return (
      <div className="mt-3 sm:mt-5 p-20">
        <h1 className="text-lg leading-6 font-medium text-gray-900">
          Sales statistics below: 
        </h1>

        <div className="text-lg mt-2 mb-6">
          {/* <p className="text-sm text-gray-500"> */}
          <p>
            You chose to produce a <b>{productionQuality}</b> quality product at the cost of <b>{productionCost}</b> points per unit sold.
          </p>
          <p>
            You chose to advertise it as a <b>{advertisementQuality}</b> quality product.
          You sold it at a price of <b>${priceOfProduct}</b>.
          <br /> <br />
          </p>
  
          <img src={imageUrl} alt="Toothpaste Standard" width="250" height="250"/>

          <p>
            It was advertised to an audience of 100 users, and {numBuyers} users bought your product.
          </p>
          <p> 
            You earned ${priceOfProduct - productionCost}  per product x {numBuyers} units sold = {numBuyers * (priceOfProduct - productionCost)} points in sales.
          </p><br/>

          <p> Your score for this round is: {salesScore} </p>
          <p>After <b>warrant price</b> deduction of {WarrantPrice}: {salesScore - WarrantPrice}</p><br/>

          <p> Your total score is: {finalScore} </p><br/>

          <p><b>But your warrant was challenged!!!</b></p>
          <p>If you chose <b>low</b> quality product but <b>high</b> quality ad, you <b>lose 90%</b> of round score.</p>
          <p>If you chose <b>high</b> quality product but <b>low</b> quality ad, your warrant will be refunded.</p>
          <br/>
          
          <p> Your <b>new</b> score for this round is: <b>{newSalesScore}</b> </p>
          <p>After <b>warrant price</b> deduction of {WarrantPrice}: <b>{newSalesScore - WarrantPrice}</b></p><br/>

          <p>If you're eligible for a <b>refund</b> of warrant, then your score is: {newSalesScore}</p><br/>
          
          <p>Your <b>total score</b> is: {newFinalScore} </p><br/>

          <p> 
            Click to proceed to the next round to sell products in this marketplace.
          </p>
        </div>
        <Button handleClick={handleSubmit} primary>
          I'm done!
        </Button>
      </div>
    );
  } else if (challengeCond === 2) { // Case of warrant challenge: Matching quality
    return (
      <div className="mt-3 sm:mt-5 p-20">
        <h1 className="text-lg leading-6 font-medium text-gray-900">
          Sales statistics below: 
        </h1>

        <div className="text-lg mt-2 mb-6">
          {/* <p className="text-sm text-gray-500"> */}
          <p>
            You chose to produce a <b>{productionQuality}</b> quality product at the cost of <b>{productionCost}</b> points per unit sold.
          </p>
          <p>
            You chose to advertise it as a <b>{advertisementQuality}</b> quality product.
          You sold it at a price of <b>${priceOfProduct}</b>.
          <br /> <br />
          </p>
  
          <img src={imageUrl} alt="Toothpaste Standard" width="250" height="250"/>

          <p>
            It was advertised to an audience of 100 users, and {numBuyers} users bought your product.
          </p>
          <p> 
            You earned ${priceOfProduct - productionCost}  per product x {numBuyers} units sold = {numBuyers * (priceOfProduct - productionCost)} points in sales.
          </p><br/>

          <p> Your <b>score</b> for this round is: {salesScore} </p>
          <p> Your <b>total score</b> is: {finalScore - WarrantPrice} after warrant price deduction</p><br/>

          <p><b>Your warrant was challenged!!!</b></p>
          <p><b>But nothing fraudulent was found, you get refunded warrant price plus 25% more of you current round earnings!</b></p><br/>
          
          <p> Your <b>new score</b> for this round is: {newSalesScore} </p><br/>
          
          <p> Your <b>total</b> score is: {newFinalScore} </p><br/>

          <p> 
            Click to proceed to the next round to sell products in this marketplace.
          </p>
        </div>
        <Button handleClick={handleSubmit} primary>
          I'm done!
        </Button>
      </div>
    );
  } else {
    return (
      <div className="mt-3 sm:mt-5 p-20">
        <h1 className="text-lg leading-6 font-medium text-gray-900">
          Sales
        </h1>
        <div className="text-lg mt-2 mb-6">
          {/* <p className="text-sm text-gray-500"> */}
          <p>
            You chose to produce a <b>{productionQuality}</b> quality product.
          </p>
          <p>
            You chose to advertise it as a <b>{advertisementQuality}</b> quality product.
          You sold it at a price of <b>${priceOfProduct}</b>.
          <br /> <br />
          </p>
  
          <img src={imageUrl} alt="Toothpaste Standard" width="250" height="250"/>
  
          
          <p>
            It was advertised to an audience of 100 users, and {numBuyers} users bought your product.
          </p>
          <p> 
            You earned ${priceOfProduct - productionCost}  per product x {numBuyers} units sold = {numBuyers * (priceOfProduct - productionCost)} points in sales.
          </p><br/>
          <p>If you chose to warrant your product, then half of <b>{WarrantPrice}</b>(Warrant Price) will be deducted from your score.</p><br/>
          <p>Your <b>score</b> for this round is: {salesScore}</p>
          <p>Your <b>total score</b> is: {finalScore}</p><br/>
          <p> 
            Click to proceed to the next round to sell products in this marketplace.
          </p>
        </div>
        <Button handleClick={handleSubmit} primary>
          I'm done!
        </Button>
      </div>
    );
  }


}