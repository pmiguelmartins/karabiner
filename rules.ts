import fs from "fs";
import { KarabinerRules } from "./types";
import { createHyperSubLayers, app, open, rectangle } from "./utils";

const rules: KarabinerRules[] = [
  // Define the Hyper key itself
  {
    description: "Hyper Key (⌃⌥⇧⌘)",
    manipulators: [
      {
        description: "Caps Lock -> Hyper Key",
        from: {
          key_code: "caps_lock",
          modifiers: {
            optional: ["any"],
          },
        },
        to: [
          {
            set_variable: {
              name: "hyper",
              value: 1,
            },
          },
        ],
        to_after_key_up: [
          {
            set_variable: {
              name: "hyper",
              value: 0,
            },
          },
        ],
        to_if_alone: [
          {
            key_code: "caps_lock",
          },
        ],
        type: "basic",
      },
      //      {
      //        type: "basic",
      //        description: "Disable CMD + Tab to force Hyper Key usage",
      //        from: {
      //          key_code: "tab",
      //          modifiers: {
      //            mandatory: ["left_command"],
      //          },
      //        },
      //        to: [
      //          {
      //            key_code: "tab",
      //          },
      //        ],
      //      },
    ],
  },
  ...createHyperSubLayers({

    // "Developer Apps"
    d: {
      v: app("Visual Studio Code"),
      g: app("Google Chrome"),
      f: app("Fork"),
      t: app("TablePlus"),
      c: app("Beyond Compare"),
    },

    // Browse
    e: {
      p: open("https://plataforma.4p2p.pt"),
    },

    // a = "Open" applications
    a: {
      t: app("Terminal"),
      z: app("zoom.us"),
      f: app("Finder"),
      w: app("Texts"), // "W"hatsApp has been replaced by Texts
    },

    // "Raycast"
    r: {
      p: open("raycast://extensions/raycast/raycast/confetti"),
      h: open("raycast://extensions/raycast/clipboard-history/clipboard-history"),
      l: open("raycast://extensions/raycast/raycast/search-quicklinks"),
      s: open("raycast://extensions/raycast/file-search/search-files"),
    },

    // "Window" via rectangle.app
    w: {
      y: rectangle("previous-display"),
      o: rectangle("next-display"),
      k: rectangle("top-half"),
      j: rectangle("bottom-half"),
      h: rectangle("left-half"),
      l: rectangle("right-half"),
      m: rectangle("maximize"),
      n: rectangle("almost-maximize"),
      b: rectangle("center"),
      r: rectangle("restore"),
      up_arrow: rectangle("top-half"),
      down_arrow: rectangle("bottom-half"),
      left_arrow: rectangle("left-half"),
      right_arrow: rectangle("right-half"),
    },

    // "System"
    s: {
      u: {
        to: [{ key_code: "volume_increment", },],
      },
      j: {
        to: [{ key_code: "volume_decrement", },],
      },
      l: {
        to: [{
          key_code: "q",
          modifiers: ["right_control", "right_command"],
        },],
      },
    },

    // Musi*c* which isn't "m" because we want it to be on the left hand
    m: {
      p: {
        to: [{ key_code: "play_or_pause" }],
      },
      n: {
        to: [{ key_code: "fastforward" }],
      },
      b: {
        to: [{ key_code: "rewind" }],
      },
    },
  }),
];

fs.writeFileSync(
  "karabiner.json",
  JSON.stringify(
    {
      global: {
        show_in_menu_bar: false,
      },
      profiles: [
        {
          name: "Default",
          complex_modifications: {
            rules,
          },
        },
      ],
    },
    null,
    2
  )
);
