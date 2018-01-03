import * as React from "react"
import * as ReactDOM from "react-dom"
import ReactRenderer from "markdown-it-renderer/ReactRenderer"
import * as MarkdownItComponent from "markdown-it-component"
import * as ast from "./article.md"
import Scale from "./components/Scale"
import "./style"

const components = { Scale }

const renderer = new ReactRenderer({
	tag: (name, props: any, children) => {
		if (components[name]) {
			return React.createElement(components[name], props, ...children)
		}
		// Fix the annoying div inside a p warning.
		if (name === "p") {
			return React.createElement(
				"div",
				{
					style: { margin: "1em 0" },
					...props,
				},
				...children
			)
		}
	},
})
const rendered = renderer.renderAst(ast)

const root = document.getElementById("root")
ReactDOM.render(<div>{rendered}</div>, root)
