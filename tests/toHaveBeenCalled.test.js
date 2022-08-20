function drinkAll(callback, flavour) {
  if (flavour !== "octopus") {
    callback(flavour);
  }
}

const jest = new Jest();
const drink = jest.fn((flavour) => console.log(flavour));
drinkAll(drink, "lemon");
expect(drink, jest).toHaveBeenCalled();
