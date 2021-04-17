# Hardware Simulator

Simulates hardwares from the "atom" size being a gate. Constructs 
the view from the input provided at the bottom of the screen. 

# Future Features

- [ ] Clock (no inputs, only out an alternating value) - e.g. (and (clk) 1)
    - [ ] Parser
    - [ ] Calculator
    - [ ] Gate
- [ ] Control the clock timing with a new input (how many seconds between each clock tick)
    - [ ] Calculator
    - [ ] Form input
- [ ] Register (takes in the value to save and value that controls when that save happens) - e.g. (and (reg (clk) (clk)))
    - [ ] Parser
    - [ ] Calculator
    - [ ] Gate
- [ ] Logic snippet variables
    - [ ] Parser
    - [ ] Calculator
    - [ ] Gate
    - [ ] Variable panel
- [ ] Create logic functions - e.g. ((fn (x y) (and x y)) x y)
    - [ ] Parser
    - [ ] Calculator