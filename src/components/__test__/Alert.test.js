import React from "react";
import { render, unmountComponentAtNode } from "react-dom";
import { act } from "react-dom/test-utils";

import Alert from "../Alert/Alert";

let container = null;
beforeEach(() => {
    // ustaw element DOM jako cel renderowania
    container = document.createElement("div");
    document.body.appendChild(container);
});

afterEach(() => {
    // posprzątaj po zakończeniu
    unmountComponentAtNode(container);
    container.remove();
    container = null;
});

it("renders alert with content", () => {
    act(() => {
        render(
            <Alert content="There was a problem..." type="error" />,
            container
        );
    });
    expect(container.textContent).toBe("There was a problem...");
    act(() => {
        render(
            <Alert content="The recipe has been published..." type="success" />,
            container
        );
    });
    expect(container.textContent).toBe("The recipe has been published...");
});
