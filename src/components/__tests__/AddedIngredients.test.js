import React from "react";
import { render, screen, waitFor } from "@testing-library/react";

import AddedIngredients from "../RecipeEditor/AddedIngredients";

const data = [
    {
        name: "water",
        quantity: "200",
        unit: "ml",
    },
    {
        name: "potatoes",
        quantity: "1",
        unit: "kg",
    },
];
describe("Ingredients test", () => {
    let container = null;
    beforeEach(async () => {
        await waitFor(
            () => (container = render(<AddedIngredients ingredients={data} />))
        );
    });

    afterEach(() => {
        container.unmount();
    });

    it("renders ingredients list", () => {
        screen.getAllByTestId("chip").forEach((chip, index) => {
            // check if every ingredient has appropiate content
            expect(chip.textContent).toEqual(
                `${data[index].name} - ${data[index].quantity}${data[index].unit}`
            );
        });
    });
});
