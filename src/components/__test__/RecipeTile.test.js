import React from "react";
import { act, render, screen } from "@testing-library/react";

import RecipeTile from "../Recipes/RecipeTile/RecipeTile";
import { unmountComponentAtNode } from "react-dom";

const recipe1 = {
    // MOCK DATA 1
    id: "572a9575-d84d-4dae-b943-1f8feb681bbf",
    title: "Napolitana",
    img:
        "https://www.oetker.pl/Recipe/Recipes/oetker.pl/pl-pl/miscallaneous/image-thumb__51050__RecipeDetailsLightBox/pizza-domowa.jpg",
    ingredients: [
        {
            name: "flour",
            quantity: 800,
            unit: "g",
        },
        {
            name: "water",
            quantity: 1000,
            unit: "ml",
        },
        {
            name: "salt",
            quantity: 5,
            unit: "g",
        },
        {
            name: "apples",
            quantity: 5,
            unit: "pieces",
        },
    ],
    notes: "The best pizza",
};

const recipe2 = {
    // MOCK DATA 2
    id: "572a9575-d84d-4dae-b943-1f8feb681bbe",
    title: "Salad",
    img:
        "https://www.howsweeteats.com/wp-content/uploads/2020/05/summer-salad-16-500x375.jpg",
    ingredients: [
        {
            name: "tomatos",
            quantity: 3,
            unit: "pieces",
        },
        {
            name: "broccoli",
            quantity: 1,
            unit: "piece",
        },
        {
            name: "eggs",
            quantity: 2,
            unit: "pieces",
        },
    ],
    notes: "The most healthy salad!",
};

describe("RecipeTile test", () => {
    let container = null;
    beforeEach(() => {
        container = document.createElement("div");
        document.body.appendChild(container);
    });

    afterEach(() => {
        unmountComponentAtNode(container);
        container.remove();
        container = null;
    });

    it("renders recipe tile with 4 ingredients", () => {
        act(() => {
            render(<RecipeTile recipe={recipe1} />, container); // render first recipe
        });
        expect(screen.getByText(recipe1.title)).toBeTruthy(); // check if title exists
        expect(screen.getByText(recipe1.notes)).toBeTruthy(); // check if notes exists

        recipe1.ingredients // check if first 3 ingredients exist
            .slice(0, 3)
            .forEach((i) =>
                expect(
                    screen.getByText(`${i.name} - ${i.quantity}${i.unit}`)
                ).toBeTruthy()
            );
        recipe1.ingredients // check if first 3 ingredients DO NOT exist
            .slice(3)
            .forEach((i) =>
                expect(
                    screen.queryByText(`${i.name} - ${i.quantity}${i.unit}`)
                ).toBeNull()
            );

        expect(screen.queryByTestId("more-ingredients")).toBeTruthy(); // check if more-ingredients text exists
        expect(screen.getByText("1 more...")).toBeTruthy();
    });

    it("renders recipe tile with 3 ingredients", () => {
        act(() => {
            render(<RecipeTile recipe={recipe2} />, container); //render second recipe
        });
        expect(screen.getByText(recipe2.title)).toBeTruthy(); // check if title exists
        expect(screen.getByText(recipe2.notes)).toBeTruthy(); // check if notes exists
        recipe2.ingredients.forEach((
            i // check if every ingredient exists
        ) =>
            expect(
                screen.getByText(`${i.name} - ${i.quantity}${i.unit}`)
            ).toBeTruthy()
        );
        expect(screen.queryByTestId("more-ingredients")).toBeNull(); // check if more-ingredients text DOES NOT exist
    });
});
