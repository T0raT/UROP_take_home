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

  //Warrant RNG logic goes here
  /* 
    TODO: Check if player is challenged, if true then also check if 
    productionQuality === advertisementQuality.
    If they aren't equal then player loses 90% of their current round income.

    TODO 2: Different issue now, im thinking about changing salesScore and finalScore
    by saving them into an object and dynamically updating them dependent on challenged condition.
    */
  const salesScore = (numBuyers * (priceOfProduct - productionCost));
  const finalScore = currentScore + salesScore;

  let newSalesScore = 0;
  let newFinalScore = 0;
  let WarrantChallenge = false;

  if (Math.random() <= 0.3) {
    WarrantChallenge = true;
    console.log("Warrant challenge set to true.")
  }

  const challengeCond = WarrantChallenge && productionQuality === "low" && advertisementQuality === "high";

  if (challengeCond) {
    newSalesScore = salesScore - Math.floor(salesScore * 0.9);
    newFinalScore = currentScore + newSalesScore;
    console.log("Warrant challenged. New sales score: ", newSalesScore);
    console.log("Warrant challenged. New final score: ", newFinalScore);
  }



  //Calculates the final score for each round



  function handleSubmit() {
    console.log('Moving on from results round');
    player.stage.set("submit", true);
    player.set("score", finalScore);
  }
  
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