import React from "react";
import { render, unmountComponentAtNode } from "react-dom";
import { act } from "react-dom/test-utils";

import Alert from "../Alert/Alert";

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

it("renders alert with content", async () => {
    act(() => {
        render(
            <Alert content="There was a problem..." type="error" />,
            container
        );
    });
    expect(container.textContent).toBe("There was a problem..."); // check if alert renders appropiate content
    act(() => {
        render(
            <Alert content="The recipe has been published..." type="success" />,
            container
        );
    });
    expect(container.textContent).toBe("The recipe has been published...");
});
