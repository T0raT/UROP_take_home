# Take home assignment short answers:
### Short Answer 1: 
##### Discuss how you would plan the feature including any designs, references, links to resources you’ve used to determine the best way to develop such a feature.

  First, to understand and familiarize myself with the code base, I utilized Empirica, JavaScript, and React documentation to understand how each component works along with others, how critical round and player information is saved and passed across different JSX components, and rendered onto the HTML page. Since I have had no previous experience with the Empirica and React framework, to deepen my understanding, I will begin by editing the given code to see which section of code affects what is rendered on the page and how player statistics are stored and carried over several rounds. I would not hesitate to ask other, more experienced developers to help me understand parts that confuse me.
  
  After grasping the structure of the given code and familiarizing myself with new tools, I would then research more about the basics of the warranty features and how they should work in tandem with the preexisting features based on real-world examples and explanations of warrants. But obviously, it cannot closely follow real-world examples since the code base is considerably more simplified, especially with only a few critical components based on player choices, such as production quality and ad quality, that actually affect the results in this simulation.

  Since the project already provides a UI format that it follows, it would be wise to implement the basic logic of the warrant feature before considering how to modify and improve the UI. I can follow the design philosophy and integrate the feature seamlessly by following the same structure and naming convention of functions to keep the code clean and organized. To continue planning/designing the warrant feature, I would write down some pseudo code that follows the same structure as other components that handle player information and choices in Advertise.jsx.

   After writing the pseudo-code and with a good amount of understanding of the code structure, I will move on to first implementing the interactable elements for players to make their choice to warrant their product or not, then move on to implementing functions that handle saving player choice and data to then pass on to Results.jsx to calculate the final score dependent on player choice. I will keep everything simple; the focus is the logic and implementation. Adding descriptive details can come last after ensuring the basic logic works. Since the warrant feature is conditional and the result of a player's score will depend on whether the player chose to warrant or not, and also product/ad quality, before implementing another choice "routes," I will only implement one of the few possible outcomes, then move on to others when the most basic features are complete. To ensure minimal changes are needed when testing various player choices that affect how results are calculated, I will prevent this by avoiding hard-coding any values.

   Throughout my time implementing the warrant feature. I will comment on my code to help with any to-do's, reminders, and clarifying comments that allow me to remember and understand what pieces of code are doing. On top of this, I will be committing changes to GitHub to ensure that if I make errors that I can't resolve, I can revert to a previous commit. 

   
### Short Answer 2:
##### Discuss why this feature is reflective of a real-world marketplace and what kind of trade-offs you would want to consider to make this feature easy for users to employ.




# empirica-dev
Empirica Development Repository for Experimentation.

For installation instructions, check out [this Google Document](https://docs.google.com/document/d/1h0MvtqK9ss_Yw3fcofB_j0B_T7V7GodYdjEjKUqiPws/edit?usp=sharing).

For issues to start contributing to, take a look at the open [Issues](https://github.com/Digital-Information-Research-Lab/empirica-dev/issues).

For details on our progress, check out the [Experiment Roadmap](https://github.com/orgs/Digital-Information-Research-Lab/projects/2) (you will need access if you can't view this, since it's private. Ping [SwapneelM](https://github.com/swapneelm))
