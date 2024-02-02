import { PageProps } from "pages/types";
import { replaceChild, stringToHTML } from "utils";

export const memoryLeaksPage = (props: PageProps) => {
  const htmlTemplate = /* HTML */ ` <h1>Memory Leaks</h1>
    <div>
      <div>
        <p><strong>What are Memory Leaks?</strong></p>
        <span> </span>
        <ul>
          <span> </span>
          <li>
            <strong>Definition:</strong>
            <span>
              A memory leak occurs when a JavaScript program retains references
              to objects that are no longer needed,</span
            ><span>
              preventing the garbage collector from freeing up the memory they
              occupy.</span
            >
          </li>
          <span> </span>
          <li>
            <strong>Consequences:</strong><span> Over time,</span
            ><span> this leads to excessive memory usage,</span
            ><span> potentially causing performance issues such as:</span
            ><span> </span>
            <ul>
              <span> </span>
              <li>
                <span>Slowdowns and unresponsiveness</span>
              </li>
              <span> </span>
              <li><span>Crashes</span></li>
              <span> </span>
              <li><span>High latency</span></li>
              <span> </span>
              <li><span>Browser freezes</span></li>
              <span> </span>
            </ul>
            <span> </span>
          </li>
          <span> </span>
        </ul>
        <span> </span>
        <p><strong>Common Causes:</strong></p>
        <span> </span>
        <ol>
          <span> </span>
          <li>
            <strong>Global Variables:</strong><span> </span>
            <ul>
              <span> </span>
              <li>
                <span
                  >Unintentionally creating global variables that hold onto
                  large objects can lead to leaks.</span
                >
              </li>
              <span> </span>
            </ul>
            <span> </span>
          </li>
          <span> </span>
          <li>
            <strong>Closures:</strong><span> </span>
            <ul>
              <span> </span>
              <li>
                <span
                  >Closures can inadvertently capture variables from their outer
                  scope,</span
                ><span>
                  keeping those variables (and their associated objects) alive
                  even when they're no longer needed.</span
                >
              </li>
              <span> </span>
            </ul>
            <span> </span>
          </li>
          <span> </span>
          <li>
            <strong>Event Listeners:</strong><span> </span>
            <ul>
              <span> </span>
              <li>
                <span
                  >Failing to remove event listeners attached to DOM elements or
                  other objects can prevent those objects from being garbage
                  collected.</span
                >
              </li>
              <span> </span>
            </ul>
            <span> </span>
          </li>
          <span> </span>
          <li>
            <strong>Timers:</strong><span> </span>
            <ul>
              <span> </span>
              <li>
                <span>Not clearing timers created with </span
                ><code class="">setTimeout</code><span> or </span
                ><code class="">setInterval</code
                ><span> can keep objects alive within their callbacks.</span>
              </li>
              <span> </span>
            </ul>
            <span> </span>
          </li>
          <span> </span>
          <li>
            <strong>Caching:</strong><span> </span>
            <ul>
              <span> </span>
              <li>
                <span>Improper cache management,</span
                ><span>
                  such as storing large objects without a clear eviction
                  strategy,</span
                ><span> can cause memory leaks.</span>
              </li>
              <span> </span>
            </ul>
            <span> </span>
          </li>
          <span> </span>
          <li>
            <strong>Detached DOM Elements:</strong><span> </span>
            <ul>
              <span> </span>
              <li>
                <span
                  >Removing elements from the DOM without also removing their
                  event listeners and data can create leaks.</span
                >
              </li>
              <span> </span>
            </ul>
            <span> </span>
          </li>
          <span> </span>
          <li>
            <strong>Third-Party Libraries:</strong><span> </span>
            <ul>
              <span> </span>
              <li>
                <span
                  >Some libraries might introduce memory leaks due to internal
                  implementation issues.</span
                >
              </li>
              <span> </span>
            </ul>
            <span> </span>
          </li>
          <span> </span>
        </ol>
        <span> </span>
        <p>
          <strong>Prevention and Solutions:</strong>
        </p>
        <span> </span>
        <ul>
          <span> </span>
          <li>
            <strong>Identify and Remove Unnecessary References:</strong
            ><span> </span>
            <ul>
              <span> </span>
              <li>
                <span
                  >Use tools like Chrome DevTools' Memory tab to profile memory
                  usage and detect leaks.</span
                >
              </li>
              <span> </span>
              <li>
                <span
                  >Analyze code to identify and remove unnecessary references to
                  objects.</span
                >
              </li>
              <span> </span>
            </ul>
            <span> </span>
          </li>
          <span> </span>
          <li>
            <strong>Adopt Best Practices:</strong><span> </span>
            <ul>
              <span> </span>
              <li>
                <span>Avoid global variables when possible.</span>
              </li>
              <span> </span>
              <li>
                <span
                  >Be mindful of closures and their potential to capture
                  variables.</span
                >
              </li>
              <span> </span>
              <li>
                <span
                  >Remove event listeners when components unmount or elements
                  are removed.</span
                >
              </li>
              <span> </span>
              <li>
                <span>Clear timers when they're no longer needed.</span>
              </li>
              <span> </span>
              <li>
                <span>Implement proper cache management strategies.</span>
              </li>
              <span> </span>
              <li>
                <span
                  >Thoroughly test third-party libraries for memory leaks.</span
                >
              </li>
              <span> </span>
            </ul>
            <span> </span>
          </li>
          <span> </span>
          <li>
            <strong>Utilize Tools for Detection and Analysis:</strong
            ><span> </span>
            <ul>
              <span> </span>
              <li>
                <span
                  >Leverage browser developer tools for memory profiling.</span
                >
              </li>
              <span> </span>
              <li>
                <span>Consider using memory leak detection libraries.</span>
              </li>
              <span> </span>
            </ul>
            <span> </span>
          </li>
          <span> </span>
        </ul>
        <span> </span>
        <p><strong>Remember:</strong></p>
        <span> </span>
        <ul>
          <span> </span>
          <li>
            <span>Proactive prevention is key to avoiding memory leaks.</span>
          </li>
          <span> </span>
          <li>
            <span
              >Regularly monitor memory usage and performance in your
              applications.</span
            >
          </li>
          <span> </span>
          <li>
            <span>Adopt coding practices that minimize the risk of leaks.</span>
          </li>
          <span> </span>
        </ul>
        <span> </span>
      </div>
    </div>`;
  const element = stringToHTML(htmlTemplate).node;

  replaceChild({
    targetElement: props.targetElement,
    element
  });
};
