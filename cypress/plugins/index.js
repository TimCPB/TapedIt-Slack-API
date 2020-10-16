/// <reference types="cypress" />
// ***********************************************************
// This example plugins/index.js can be used to load plugins
//
// You can change the location of this file or turn off loading
// the plugins file with the 'pluginsFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/plugins-guide
// ***********************************************************

// This function is called when a project is opened or re-opened (e.g. due to
// the project's config changing)
const fs = require("fs");
const path = require("path");
const wp = require("@cypress/webpack-preprocessor");
const mongoose = require("mongoose");
import { User } from "../../src/models/user";

const webpackOptions = {
  watch: true,
  resolve: {
    extensions: [".ts", ".js", ".mjs"],
  },
  module: {
    rules: [
      {
        test: /\.mjs$/,
        include: /node_modules/,
        type: "javascript/auto",
      },
      {
        test: /\.ts$/,
        exclude: [/node_modules/],
        use: [
          {
            loader: "ts-loader",
            options: {
              transpileOnly: true,
            },
          },
        ],
      },
    ],
  },
};

/**
 * @type {Cypress.PluginConfig}
 */
module.exports = (on, config) => {
  // `on` is used to hook into various events Cypress emits
  // `config` is the resolved Cypress config
  on("task", {
    getSchema() {
      return fs.readFileSync(
        path.resolve(__dirname, "../../src/mocks_schemas.graphql"),
        "utf8"
      );
    },
  });

  on("file:preprocessor", wp({ webpackOptions }));
  on("task", {
    addUser(slackIDObj) {
      return new Promise((resolve) => {
        mongoose.connect(
          "mongodb://localhost/test",
          { useNewUrlParser: true, useUnifiedTopology: true },
          (err) => {
            const { slackID } = slackIDObj;
            const senderNotes = [];
            const receiverNotes = [];
            const user = new User({ slackID, senderNotes, receiverNotes });
            user.save((err) => {
              resolve("done");
            });
          }
        );
      });
    },
  });
};
