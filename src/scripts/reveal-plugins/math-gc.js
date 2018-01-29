MathJax.Hub.Register.StartupHook("TeX Jax Ready",function () {
      const TEX = MathJax.InputJax.TeX;

      TEX.Definitions.Add({macros: {
        'fragment': 'FRAGMENT_INDEX_attribute', // regular fragments
        'fragapply': 'FRAGMENT_apply', // style change to fragments
        'texclass': 'TEX_APPLY_class' // add any class to an element
      }});

      TEX.Parse.Augment({
        FRAGMENT_INDEX_attribute: function (name) {
          const index = this.GetArgument(name);
          const arg   = this.ParseArg(name);
          this.Push(arg.With({
            'class': 'fragment',
            attrNames: ['data-fragment-index'],
            attr: {'data-fragment-index':index}
          }));
        },
        FRAGMENT_apply: function (name) {
          const input = this.GetArgument(name)
          let [apply_kind, index] = [...input.split(" ")];
          const arg   = this.ParseArg(name);
          if (index) {
            this.Push(arg.With({
              'class': 'fragapply fragment ' + apply_kind,
              attrNames: ['data-fragment-index'],
              attr: {'data-fragment-index':index}
            }));
          } else {
            this.Push(arg.With({
              'class': 'fragapply fragment ' + apply_kind
            }));
          }
        },
        TEX_APPLY_class: function (name) {
          const class_kind = this.GetArgument(name);
          const arg   = this.ParseArg(name);
          this.Push(arg.With({
             'class': class_kind
          }));
        }
      }); // TEX.parse.argument
    }); // Mathjax.hub.register

MathJax.Ajax.loadComplete("/Users/Gui/Git/revealjs-webpack-sauce/src/scripts/reveal-plugins/math-gc.js");
