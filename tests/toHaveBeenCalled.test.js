function drinkAll(callback, flavour) {
  if (flavour !== "octopus") {
    callback(flavour);
  }
}

const drink = jest.fn((flavour) => console.log(flavour));
drinkAll(drink, "octopus");
expect(drink).toHaveBeenCalled();
