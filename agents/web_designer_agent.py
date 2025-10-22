
class WebDesignerAgent:
    def __init__(self):
        self.knowledge_base = {
            "ui/ux design": "UI (User Interface) design focuses on the visual elements and interactivity of a product, while UX (User Experience) design focuses on the overall feeling and usability of the product. Both are crucial for creating engaging and effective web solutions.",
            "visual hierarchy": "Visual hierarchy is the principle of arranging elements to show their order of importance. This is achieved through variations in size, color, contrast, typography, and placement to guide the user's eye through the design.",
            "typography": "Typography is the art and technique of arranging type to make written language legible, readable, and appealing when displayed. Key aspects include font choice, size, line height, letter spacing, and color.",
            "color theory": "Color theory is a body of practical guidance to color mixing and the visual effects of a specific color combination. In web design, it's used to evoke emotions, create contrast, and establish brand identity.",
            "layout design": "Layout design involves arranging visual elements on a page to create an organized and aesthetically pleasing composition. Common layout techniques include grid systems, flexbox, and CSS Grid for responsive and adaptive designs.",
            "responsive design": "Responsive web design (RWD) is an approach to web design that makes web pages render well on a variety of devices and window or screen sizes. It ensures a consistent user experience across desktops, tablets, and mobile phones.",
            "design systems": "A design system is a complete set of standards, documentation, and principles, along with UI patterns and components, that guide the design and development of a product. It ensures consistency, efficiency, and scalability in design.",
            "branding": "Branding in web design involves creating a unique identity for a product or company through visual elements like logos, color palettes, typography, and imagery. A strong brand identity helps in recognition and building trust.",
            "accessibility": "Web accessibility (a11y) ensures that websites are usable by people with disabilities. This includes considerations for screen readers, keyboard navigation, color contrast, and alternative text for images.",
            "animation": "Web animation can enhance user experience by providing visual feedback, guiding attention, and making interfaces more engaging. It should be used purposefully to improve usability, not just for aesthetics.",
            "imagery": "The choice and placement of images, icons, and other visual assets significantly impact a website's aesthetic and message. High-quality, relevant imagery can greatly improve user engagement.",
            "white space": "Whitespace (or negative space) is the empty area around and between elements in a design. It's crucial for improving readability, creating visual breathing room, and emphasizing content.",
            "figma": "Figma is a popular web-based interface design tool that allows for collaborative design, prototyping, and handoff. It's widely used for UI/UX design, wireframing, and creating design systems.",
            "adobe xd": "Adobe XD is a vector-based user experience design tool for web and mobile apps. It supports wireframing, prototyping, and sharing designs with team members.",
            "sketch": "Sketch is a vector graphics editor for macOS, primarily used for user interface and user experience design of websites and mobile apps.",
            "user research": "User research is the systematic investigation of users and their requirements, in order to add realistic contexts and insights to the design process. Methods include interviews, surveys, and usability testing.",
            "wireframing": "Wireframing is a way to design a website service at the structural level. A wireframe is commonly used to lay out content and functionality on a page which takes into account user needs and user journeys.",
            "prototyping": "Prototyping involves creating preliminary versions of a product to test concepts, gather feedback, and iterate on designs before final development. It helps in visualizing interactions and user flows.",
            "grid systems": "Grid systems provide a structured way to organize content on a page, ensuring alignment and consistency. They are fundamental for creating responsive and visually balanced layouts.",
            "material design": "Material Design is a design system developed by Google, providing guidelines for visual, motion, and interaction design across platforms and devices. It emphasizes a clean, modern aesthetic with realistic motion.",
            "flat design": "Flat design is a minimalist UI design style featuring clean, open space, crisp edges, bright colors, and two-dimensional illustrations. It prioritizes usability and fast loading times.",
            "neumorphism": "Neumorphism is a UI design trend that combines characteristics of skeuomorphism and flat design. It uses subtle shadows and highlights to create a soft, extruded, 3D-like effect.",
            "" : "I am a web design expert, specializing in creating visually interesting solutions. I can provide insights on UI/UX, visual hierarchy, typography, color theory, layout design, responsive design, design systems, branding, accessibility, animation, imagery, white space, and tools like Figma, Adobe XD, and Sketch. What design challenge are you facing?"
        }

    def ask(self, query):
        query = query.lower()
        for keyword, answer in self.knowledge_base.items():
            if keyword in query:
                return answer
        return "I'm sorry, I don't have specific information on that topic in my knowledge base. I can answer questions about UI/UX design, visual hierarchy, typography, color theory, layout design, responsive design, design systems, branding, accessibility, animation, imagery, white space, Figma, Adobe XD, Sketch, user research, wireframing, prototyping, grid systems, Material Design, flat design, and neumorphism."

if __name__ == "__main__":
    agent = WebDesignerAgent()
    print("Web Designer Agent: Hello! I am an expert in web design. Ask me anything about visual solutions!")
    while True:
        user_query = input("You: ")
        if user_query.lower() in ["exit", "quit", "bye"]:
            print("Web Designer Agent: Goodbye!")
            break
        response = agent.ask(user_query)
        print(f"Web Designer Agent: {response}")
