
class FrontendAgent:
    def __init__(self):
        self.knowledge_base = {
            "react": "React is a JavaScript library for building user interfaces, maintained by Facebook and a community of individual developers and companies. It allows developers to create large web applications that can change data without reloading the page.",
            "angular": "Angular is a TypeScript-based open-source web application framework led by the Angular Team at Google and by a community of individuals and corporations. It is a complete platform for building mobile and desktop web applications.",
            "vue": "Vue.js is an open-source model–view–viewmodel JavaScript framework for building user interfaces and single-page applications. It is designed to be progressively adoptable, and can easily integrate with other libraries or existing projects.",
            "html": "HTML (HyperText Markup Language) is the standard markup language for documents designed to be displayed in a web browser. It can be assisted by technologies such as Cascading Style Sheets (CSS) and scripting languages such as JavaScript.",
            "css": "CSS (Cascading Style Sheets) is a style sheet language used for describing the presentation of a document written in HTML or XML (including XML dialects such as SVG, MathML or XHTML). CSS is a cornerstone technology of the World Wide Web, alongside HTML and JavaScript.",
            "javascript": "JavaScript, often abbreviated as JS, is a programming language that is one of the core technologies of the World Wide Web, alongside HTML and CSS. It enables interactive web pages and is an essential part of web applications.",
            "responsive design": "Responsive web design (RWD) is an approach to web design that makes web pages render well on a variety of devices and window or screen sizes from minimum to maximum display size to ensure usability and satisfaction.",
            "webpack": "Webpack is an open-source JavaScript module bundler. It is primarily a module bundler for JavaScript, but it can transform front-end assets like HTML, CSS, and images if the corresponding loaders are included.",
            "babel": "Babel is a free and open-source JavaScript transpiler that is mainly used to convert ECMAScript 2015+ (ES6+) code into a backward compatible version of JavaScript that can be run by older JavaScript engines.",
            "typescript": "TypeScript is an open-source language which builds on JavaScript, by adding static type definitions. It is designed for the development of large applications and transcompiles to JavaScript.",
            "frontend performance": "Frontend performance optimization involves techniques to make web applications load faster and run smoother. This includes optimizing images, lazy loading, code splitting, caching, and minimizing HTTP requests.",
            "accessibility": "Web accessibility (often abbreviated as a11y) is the inclusive practice of ensuring there are no barriers that prevent interaction with, or access to, websites on the World Wide Web by people with physical disabilities, situational disabilities, and socio-economic restrictions.",
            "seo": "Search engine optimization (SEO) is the process of improving the quality and quantity of website traffic to a website or a web page from search engines. SEO targets unpaid traffic (known as "natural" or "organic" results) rather than direct traffic or paid traffic.",
            "pwa": "Progressive Web Apps (PWAs) are web applications that are regular web pages or websites, but can appear to the user like traditional native mobile applications. They combine features offered by most modern browsers with the benefits of a mobile experience.",
            "rest api": "A RESTful API (Representational State Transfer) is an architectural style for an application program interface (API) that uses HTTP requests to access and use data. That data can be used to GET, PUT, POST and DELETE data types, which refers to the reading, updating, creating and deleting of operations concerning resources.",
            "graphql": "GraphQL is an open-source data query and manipulation language for APIs, and a runtime for fulfilling queries with existing data. GraphQL was developed internally by Facebook in 2012 before being publicly released in 2015.",
            "redux": "Redux is an open-source JavaScript library for managing and centralizing application state. It is most commonly used with libraries like React or Angular for building user interfaces.",
            "next.js": "Next.js is an open-source React front-end development web framework created by Vercel that enables React-based web applications with server-side rendering and generating static websites.",
            "ssr": "Server-side rendering (SSR) is the ability of an application to convert HTML files on the server into a fully rendered HTML page for the client. The web browser submits a request for a page to the server, and the server immediately responds with a fully rendered page that is ready for the client to view.",
            "spa": "A single-page application (SPA) is a web application or website that interacts with the user by dynamically rewriting the current web page with new data from the web server, instead of the default method of a web browser loading entire new pages.",
            "web components": "Web Components is a suite of different technologies allowing you to create reusable custom elements — with their functionality encapsulated away from the rest of your code — and utilize them in your web apps.",
            "npm": "npm is a package manager for the JavaScript programming language. It is the default package manager for the JavaScript runtime environment Node.js. It consists of a command line client, also called npm, and an online database of public and paid-for private packages, called the npm registry.",
            "yarn": "Yarn is a package manager for JavaScript code. It was developed in 2016 by Facebook, Exponent, Google, and Tilde to solve performance and security concerns with npm.",
            "git": "Git is a distributed version control system that tracks changes in any set of computer files, usually used for coordinating work among programmers collaboratively developing source code during software development.",
            "ci/cd": "CI/CD (Continuous Integration/Continuous Delivery or Continuous Deployment) is a method to deliver apps frequently to customers by introducing automation into the stages of app development.",
            "testing": "Frontend testing involves various types of tests like unit tests, integration tests, end-to-end tests, and UI tests to ensure the quality and functionality of the user interface.",
            "storybook": "Storybook is an open-source tool for developing UI components in isolation. It makes building stunning UIs organized and efficient.",
            "figma": "Figma is a web-based graphics editing and user interface design app. It allows users to collaborate in real-time to create interactive prototypes and designs.",
            "design system": "A design system is a complete set of standards, documentation, and principles, along with UI patterns and components, that guide the design and development of a product.",
            "component library": "A component library is a collection of reusable UI components (buttons, forms, navigation, etc.) that can be used across different projects or within the same project to maintain consistency and speed up development.",
            "module federation": "Module Federation is a webpack 5 feature that allows multiple separate builds to form a single application. These separate builds can be developed and deployed individually, and then combined at runtime.",
            "micro-frontends": "Micro-frontends is an architectural style where independently deliverable frontend applications are composed into a greater whole. This approach helps in scaling development for large and complex web applications.",
            "" : "I am a frontend development expert. I can provide information on various frontend technologies, best practices, and tools. What would you like to know?"
        }

    def ask(self, query):
        query = query.lower()
        for keyword, answer in self.knowledge_base.items():
            if keyword in query:
                return answer
        return "I'm sorry, I don't have specific information on that topic in my knowledge base. I can answer questions about React, Angular, Vue, HTML, CSS, JavaScript, responsive design, Webpack, Babel, TypeScript, frontend performance, accessibility, SEO, PWA, REST API, GraphQL, Redux, Next.js, SSR, SPA, Web Components, npm, Yarn, Git, CI/CD, testing, Storybook, Figma, design systems, component libraries, module federation, and micro-frontends."

if __name__ == "__main__":
    agent = FrontendAgent()
    print("Frontend Agent: Hello! I am an expert in frontend development. Ask me anything!")
    while True:
        user_query = input("You: ")
        if user_query.lower() in ["exit", "quit", "bye"]:
            print("Frontend Agent: Goodbye!")
            break
        response = agent.ask(user_query)
        print(f"Frontend Agent: {response}")
