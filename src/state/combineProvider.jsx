import React from "react";

/**
 * Combines multiple context providers into one.
 *
 * @param {Array} providers - An array of React provider components.
 * @returns {React.Component} - A single provider component wrapping its children in the provided providers.
 */
export const combineProviders = (providers) => {
  if (!Array.isArray(providers)) {
    throw new Error("Providers must be an array of Provider components");
  }

  return ({ children }) => {
    return providers.reduceRight((acc, Provider) => {
      if (typeof Provider !== "function") {
        throw new Error(
          "Each item in the providers array must be a valid React Component"
        );
      }
      return <Provider>{acc}</Provider>;
    }, children);
  };
};
