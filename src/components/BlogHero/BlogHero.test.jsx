import { test, expect, vitest } from "vitest";
import React from "react";
import BlogHero from "./BlogHero";
import { render } from "@testing-library/react";

test("Vérifie si le titre h1 est rendu", () => {
  const title = "Mon titre de blog";
  const publishedOn = "2023-09-01";
  const { container } = render(
    <BlogHero title={title} publishedOn={publishedOn} />
  );

  const titleElement = container.querySelector("h1");

  expect(titleElement).not.toBeNull();
  expect(titleElement.textContent).toBe(title);
});

test("Vérifie si la date est rendue", () => {
  const title = "Mon titre de blog";
  const publishedOn = "2023-09-01";
  const { container } = render(
    <BlogHero title={title} publishedOn={publishedOn} />
  );

  const dateElement = container.querySelector("time");

  expect(dateElement).not.toBeNull();
  expect(dateElement.textContent).toBe("September 1st, 2023");
});
