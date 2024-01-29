import { Playground } from "components";
import { stringToHTML, replaceChild, mount } from "utils";
import { PageProps } from "pages/types";

export const prototypePollutionPage = (props: PageProps) => {
  const playgroundId = "embed";

  const htmlTemplate = /* HTML */ `
    <h1>Prototype Pollution</h1>
    <p>
      Prototype pollution is an injection attack that targets JavaScript
      runtimes. With prototype pollution, an attacker might control the default
      values of an object's properties. This allows the attacker to tamper with
      the logic of the application and can also lead to denial of service or, in
      extreme cases, remote code execution.
    </p>
    <div id=${playgroundId}></div>
  `;

  const element = stringToHTML(htmlTemplate).node;

  replaceChild({
    targetElement: props.targetElement,
    element
  });

  mount({
    id: playgroundId,
    children: Playground({
      customSetup: {
        dependencies: {
          "lodash.merge": "latest"
        }
      },
      files: {
        "/index.ts": {
          code: `
					import safeMerge from "lodash.merge";
					// objects created via the object literal {} or the new Object() constructor share the same prototype object unless we explicitly override it.
					// if we modify a prototype shared by two or more objects, all objects will reflect this modification
						const a1 = { foo: 'bar'};
						a1.__proto__.polluted = true;

						const b1 = { bar: 'baz'};
						console.log("b1.polluted", b1.polluted);

						const a2 = {};
						const b2 = new Object();
						console.log("a2.__proto__ === b2.__proto__", a2.__proto__ === b2.__proto__);

					// how can it make our app vulnerable?
					// E.g. sending a JSON object to the server and the server uses it to create a new object
					// curl -H "Content-Type: application/json" -X POST -d '{"about": {"__proto__": {"role": "admin"}}}'
					/*
						* If we would be using a unsafe merge function like the one below, we would be vulnerable to prototype pollution as __proto__ key exists in both objects.
					*/

					const unsafeMerge = (target, source) => {
						for(const key in source){
							// recursively merge objects
							if(typeof target[key] === 'object' && typeof source[key] === 'object'){
								merge(target[key], source[key]);
							}else{
								// overwrite target key with source key
								target[key] = source[key];
							}
						}
						return target;
					}

					// using unsafe merge function doesn't filter out __proto__ key
				 console.log("unsafeMerge", unsafeMerge({}, JSON.parse('{"about": {"__proto__": {"role": "admin"} }}')));

				 // using safe merge function filters out __proto__ key
				 console.log("safeMerge", safeMerge({}, JSON.parse('{"about": {"__proto__": {"role": "admin"} }}')));


					// some other script polluting the Object prototype
					 Object.prototype.isTokenExpired = true;

					let a3 = {zoo: "zaz"};
					console.log("a3.isTokenExpired", a3.isTokenExpired);

					// Solution
					// 1. Use safe merge function
					// 2. User object.create(null) to create an object without a prototype.
					// 3. Use Map instead of Object
					// 4. Freeze properties with Object.freeze (Object.prototype). It Prevent any changes to the attributes of an object. We can freeze the default prototype by invoking Object.freeze(Object.prototype)
					// 5. Regularly update new patches for libraries

					// Reference 
					/*
					 * https://book.hacktricks.xyz/pentesting-web/deserialization/nodejs-proto-prototype-pollution
					*/

					`,
          hidden: true
        },

        "/indewx.ts": {
          code: `var d = 0;`
        },
        "/App.tsx": {
          code: `export default function App() {
						return <h1>Hel l o wor ld</h1>;
					}`
        }
        // "/readme.md": {
        //   code: `
        // 	1. feat: A new feature
        // 	2. feat: A new feature
        // 	`
        // },
        // "/el.css": {
        //   code: `
        // 			#root {display: flex;
        // 		flex-direction: column;
        // 		align-items: center;
        // 		justify-content: center;
        // 	}
        // 	`
        // }
      }
    })
  });
};
