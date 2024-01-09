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
    TODO: Logic is done, need to check if the math is correct.
    */
  const salesScore = (numBuyers * (priceOfProduct - productionCost));
  const finalScore = currentScore + salesScore - WarrantPrice;

  let newSalesScore = salesScore;
  let newFinalScore = finalScore;
  let WarrantChallenge = Math.random() <= 0.9 && WarrantChoice; //High number for testing
  if (WarrantChallenge) {
    console.log("Warrant challenge set to true.")
  }

  const challengeCond = WarrantChallenge && productionQuality === "low" && advertisementQuality === "high";

  if (challengeCond) {
    console.log("Warrant was challenged!")
    newSalesScore = Math.floor(salesScore * 0.1);
    newFinalScore = currentScore + newSalesScore - WarrantPrice;
    console.log("Warrant challenged. New sales score: ", newSalesScore);
    console.log("Warrant challenged. New final score: ", newFinalScore);
  }




  function handleSubmit() {
    console.log('Moving on from results round');
    player.stage.set("submit", true);
    if (challengeCond) {player.set("score", newFinalScore);}
    player.set("score", finalScore);
  }

  // TODO: Different HTML for different results dependent on warrant choice and challenge
  // This is ugly as hell but it sure works!
  
  if (challengeCond) {
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
            You earned ${priceOfProduct - productionCost}  per product x {numBuyers} units sold = {salesScore} points in sales.
          </p><br/>
          <p> Your score for this round is: {salesScore} </p>
          <p>A score of {WarrantPrice} will be deducted because you chose to warrant your product</p>
          <p> Your total score is: {finalScore} </p><br/>

          <p><b>But your warrant was challenged, and your product was found to be fraudulent, you lose 90% of your earnings for the current round.</b></p>
          <br/>

          <p> Your <b>new</b> score for this round is: {newSalesScore} </p>
          <p>A score of {WarrantPrice} will be deducted because you chose to warrant your product</p>
          <p> Your total score is: {newFinalScore} </p><br/>

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
            You earned ${priceOfProduct - productionCost}  per product x {numBuyers} units sold = {salesScore} points in sales.
          </p><br/>
          <p> Your score for this round is: {salesScore} </p>
          <p> Your total score is: {salesScore + currentScore} </p><br/>
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