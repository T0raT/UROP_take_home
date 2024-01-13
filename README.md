# Take home assignment short answers:
### Short Answer 1: 
##### Discuss how you would plan the feature including any designs, references, links to resources you’ve used to determine the best way to develop such a feature.

  First, to understand and familiarize myself with the code base, I utilized Empirica, JavaScript, and React documentation to understand how each component works along with others, how critical round and player information is saved and passed across different JSX components, and rendered onto the HTML page. Since I have had no previous experience with the Empirica and React framework, to deepen my understanding, I will begin by editing the given code to see which section of code affects what is rendered on the page and how player statistics are stored and carried over several rounds. I would not hesitate to ask other, more experienced developers to help me understand parts that confuse me.
  
  After grasping the structure of the given code and familiarizing myself with new tools, I would then research more about the basics of the warranty features and how they should work in tandem with the preexisting features based on real-world examples and explanations of warrants. But obviously, it cannot closely follow real-world examples since the code base is considerably more simplified, especially with only a few critical components based on player choices, such as production quality and ad quality, that actually affect the results in this simulation.

  Since the project already provides a UI format that it follows, it would be wise to implement the basic logic of the warrant feature before considering how to modify and improve the UI. I can follow the design philosophy and integrate the feature seamlessly by following the same structure and naming convention of functions to keep the code clean and organized. To continue planning/designing the warrant feature, I would write down some pseudo code that follows the same structure as other components that handle player information and choices in Advertise.jsx.

   After writing the pseudo-code and with a good amount of understanding of the code structure, I will move on to first implementing the interactable elements for players to make their choice to warrant their product or not, then move on to implementing functions that handle saving player choice and data to then pass on to Results.jsx to calculate the final score dependent on player choice. I will keep everything simple; the focus is the logic and implementation. Adding descriptive details can come last after ensuring the basic logic works. Since the warrant feature is conditional and the result of a player's score will depend on whether the player chose to warrant or not, and also product/ad quality, before implementing another choice "routes," I will only implement one of the few possible outcomes, then move on to others when the most basic features are complete. To ensure minimal changes are needed when testing various player choices that affect how results are calculated, I will prevent this by avoiding hard-coding any values.

   Throughout my time implementing the warrant feature. I will comment on my code to help with any to-do's, reminders, and clarifying comments that allow me to remember and understand what pieces of code are doing. On top of this, I will be committing changes to GitHub to ensure that if I make errors that I can't resolve, I can revert to a previous commit. 

#### Links to resources:
  - [Warranties/Guarantees post on Linkedin](https://www.linkedin.com/advice/0/why-should-you-offer-warranty-guarantee-your-products): Talks about real-world implementations of warranties and gaurantees, helped me think about my own implementation. I included guarantees in my searches because the description of warranties in this assignment also is applicable to guarantees.
  - [Forbes post on implementing Guarantees](https://www.forbes.com/sites/forbesagencycouncil/2018/05/16/the-power-of-a-guarantee-in-driving-b2b-revenue/?sh=32c19d106ff2): Dicussed various pros and cons in implementing a gaurantee in a business and how it drives revenue.
  - [MDN Web Docs](https://developer.mozilla.org/en-US/): Great for any questions or I forget anything regarding CSS/HTML and JS.
  - [Empirica Documentation](https://docs.empirica.ly/tutorials/beginner-experiment-prisoners-dilemma): The tutorial section was GREAT for understanding the structure of this project.
  - [React Documentation](https://react.dev/learn): Also great for understanding JSX and react components that was utilized in this project since it is built with JSX.

   
### Short Answer 2:
##### Discuss why this feature is reflective of a real-world marketplace and what kind of trade-offs you would want to consider to make this feature easy for users to employ.

Warranties are one of the most essential parts of real-world business strategies. Its key aspect is building customer trust and an act of confidence, assuring the product quality and reliability, which, if true, puts further assurance in trust among customers. Warranties can help differentiate your product in a heavily competitive market, vital to performing well in markets that value quality and reliability. For example, retailers like Walmart and Target all offer generous return policies and warranties, a significant part of their value proposition today. The goal is to improve customer satisfaction and, ultimately, customer loyalty. It's a delicate balance of immediate cost and long-term customer relationships. Of course, not all of its complex interactions with the market and characteristics are carried over in a simulated game since the game is a simplified version. 

Inside "Advertise. JSX", it allows players to decide on product quality, advertising strategy, pricing, and my implementation of warranties. Although simplistic, it mirrors real-world business scenarios where companies make strategic decisions on similar aspects, ultimately affecting profitability, customer perception, and market performance. And with all markets, they are sometimes unpredictable, so my warranties feature is inherently probabilistic at its core.  

Five possible "routes" were to be considered when designing the warrant feature, depending on player choice, not only will players get an increased number of potential customers, they will have the following punishment/rewards:
1. If the player chooses to warrant, and said player's warrant is challenged:
Product Quality equals Advertised Quality: The Player is rewarded for honesty, which nets players more points if they opt for this option.
2. Product Quality is low, but Advertised Quality is high: The Player is punished for deceiving customers, and players may lose most of their profits in this round.
3. Product Quality is High, but Advertised quality is low: This is the most interesting component, but I think the player shouldn't be punished. Hence, the player will receive back the price of the warrant. While it is unlikely that players will opt for this choice, regardless, it is still possible and should involve a type of reward.

If the player chooses to warrant but is not challenged, the player should get back some percentage of the warrant price. And lastly, with no warrant, the game continues the same, just like before the warrant feature was implemented.

When attempting to implement this feature, the most significant trade-off is "Complexity vs. Player Engagement". There is a limit to how many aspects of the real-world market one can implement before it is too complex for a game, and players may lose interest quickly when they read a wall of texts explaining the intricacies of game mechanics. We still want to include the most vital elements of warranties and how they should affect sales results. By removing real-world complexity, such as terms and conditions that often come with the warranties, I want to balance depth/authenticity without confusing or overwhelming the players. For players who don't have a background in business, the feature should be simple enough for them to understand the risks and rewards involved in offering warranties.

The warrant feature should be a risk and reward mechanic, and the randomness element will help make the game more dynamic and unpredictable. While too much randomness can detour from real-world situations and reduce the impact of the player strategy, a good balance between player strategy and the unpredictability of the market is crucial.


# empirica-dev
Empirica Development Repository for Experimentation.

For installation instructions, check out [this Google Document](https://docs.google.com/document/d/1h0MvtqK9ss_Yw3fcofB_j0B_T7V7GodYdjEjKUqiPws/edit?usp=sharing).

For issues to start contributing to, take a look at the open [Issues](https://github.com/Digital-Information-Research-Lab/empirica-dev/issues).

For details on our progress, check out the [Experiment Roadmap](https://github.com/orgs/Digital-Information-Research-Lab/projects/2) (you will need access if you can't view this, since it's private. Ping [SwapneelM](https://github.com/swapneelm))
