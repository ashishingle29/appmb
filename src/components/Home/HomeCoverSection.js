import { sortBlogs } from "@/src/utils";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import Tag from "../Elements/Tag";
import { slug } from "github-slugger";

const HomeCoverSection = ({ blogs }) => {
  const sortedBlogs = sortBlogs(blogs);
  const blog = {
    title: "Automating Repetitive Tasks: Productivity Hacks for Developers",
    publishedAt: "2024-05-08T07:30:00.000Z",
    updatedAt: "2024-05-08T07:30:00.000Z",
    description: "How to deploy your Next.js apps on Vercel.",
    image: {
      src: "/blogs/start sip-1740870397221.webp",
      height: 1080,
      width: 1920,
      blurDataURL:
        "data:image/webp;base64,UklGRi4AAABXRUJQVlA4ICIAAACwAQCdASoIAAUADMDOJaQAAv+tx7cAAM4da9jmQJNwAAAA",
      blurWidth: 8,
      blurHeight: 5,
    },
    isPublished: true,
    author: "codebucks",
    tags: ["productivity"],
    body: 'const{Fragment:e,jsx:n,jsxs:t}=arguments[0];function _createMdxContent(i){const o={a:"a",blockquote:"blockquote",code:"code",em:"em",figure:"figure",h2:"h2",h3:"h3",h4:"h4",hr:"hr",li:"li",ol:"ol",p:"p",pre:"pre",span:"span",strong:"strong",table:"table",tbody:"tbody",td:"td",th:"th",thead:"thead",tr:"tr",ul:"ul",...i.components},{Image:a}=o;return a||function(e,n){throw new Error("Expected "+(n?"component":"object")+" `"+e+"` to be defined: you likely forgot to import, pass, or provide it.")}("Image",!0),t(e,{children:[n(o.p,{children:"Until now, trying to style an article, document, or blog post with Tailwind has been a tedious task that required a keen eye for typography and a lot of complex custom CSS."}),"\\n",t(o.p,{children:["By default, Tailwind removes all of the default browser styling from paragraphs, headings, lists and more. This ends up being really useful for building application UIs because you spend less time undoing user-agent styles, but when you ",n(o.em,{children:"really are"})," just trying to style some content that came from a rich-text editor in a CMS or a markdown file, it can be surprising and unintuitive."]}),"\\n",n(o.p,{children:"We get lots of complaints about it actually, with people regularly asking us things like:"}),"\\n",t(o.blockquote,{children:["\\n",t(o.p,{children:["Why is Tailwind removing the default styles on my ",n(o.code,{children:"h1"})," elements? How do I disable this? What do you mean I lose all the other base styles too?\\r\\nWe hear you, but we\'re not convinced that simply disabling our base styles is what you really want. You don\'t want to have to remove annoying margins every time you use a ",n(o.code,{children:"p"})," element in a piece of your dashboard UI. And I doubt you really want your blog posts to use the user-agent styles either — you want them to look ",n(o.em,{children:"awesome"}),", not awful."]}),"\\n"]}),"\\n",t(o.p,{children:["The ",n(o.code,{children:"@tailwindcss/typography"})," plugin is our attempt to give you what you ",n(o.em,{children:"actually"})," want, without any of the downsides of doing something stupid like disabling our base styles."]}),"\\n",t(o.p,{children:["It adds a new ",n(o.code,{children:"prose"})," class that you can slap on any block of vanilla HTML content and turn it into a beautiful, well-formatted document:"]}),"\\n",n(o.figure,{"data-rehype-pretty-code-figure":"",children:n(o.pre,{style:{backgroundColor:"#24292e",color:"#e1e4e8"},tabIndex:"0","data-language":"html","data-theme":"github-dark",children:t(o.code,{"data-language":"html","data-theme":"github-dark",children:[t(o.span,{"data-line":"",children:[n(o.span,{style:{color:"#E1E4E8"},children:"<"}),n(o.span,{style:{color:"#85E89D"},children:"article"}),n(o.span,{style:{color:"#B392F0"},children:" className"}),n(o.span,{style:{color:"#E1E4E8"},children:"="}),n(o.span,{style:{color:"#9ECBFF"},children:\'"prose"\'}),n(o.span,{style:{color:"#E1E4E8"},children:">"})]}),"\\n",t(o.span,{"data-line":"",children:[n(o.span,{style:{color:"#E1E4E8"},children:"  <"}),n(o.span,{style:{color:"#85E89D"},children:"h1"}),n(o.span,{style:{color:"#E1E4E8"},children:">Garlic bread with cheese: What the science tells us</"}),n(o.span,{style:{color:"#85E89D"},children:"h1"}),n(o.span,{style:{color:"#E1E4E8"},children:">"})]}),"\\n",t(o.span,{"data-line":"",children:[n(o.span,{style:{color:"#E1E4E8"},children:"  <"}),n(o.span,{style:{color:"#85E89D"},children:"p"}),n(o.span,{style:{color:"#E1E4E8"},children:">"})]}),"\\n",n(o.span,{"data-line":"",children:n(o.span,{style:{color:"#E1E4E8"},children:"    For years parents have espoused the health benefits of eating garlic bread"})}),"\\n",n(o.span,{"data-line":"",children:n(o.span,{style:{color:"#E1E4E8"},children:"    with cheese to their children, with the food earning such an iconic status"})}),"\\n",n(o.span,{"data-line":"",children:n(o.span,{style:{color:"#E1E4E8"},children:"    in our culture that kids will often dress up as warm, cheesy loaf for"})}),"\\n",n(o.span,{"data-line":"",children:n(o.span,{style:{color:"#E1E4E8"},children:"    Halloween."})}),"\\n",t(o.span,{"data-line":"",children:[n(o.span,{style:{color:"#E1E4E8"},children:"  </"}),n(o.span,{style:{color:"#85E89D"},children:"p"}),n(o.span,{style:{color:"#E1E4E8"},children:">"})]}),"\\n",t(o.span,{"data-line":"",children:[n(o.span,{style:{color:"#E1E4E8"},children:"  <"}),n(o.span,{style:{color:"#85E89D"},children:"p"}),n(o.span,{style:{color:"#E1E4E8"},children:">"})]}),"\\n",n(o.span,{"data-line":"",children:n(o.span,{style:{color:"#E1E4E8"},children:"    But a recent study shows that the celebrated appetizer may be linked to a"})}),"\\n",n(o.span,{"data-line":"",children:n(o.span,{style:{color:"#E1E4E8"},children:"    series of rabies cases springing up around the country."})}),"\\n",t(o.span,{"data-line":"",children:[n(o.span,{style:{color:"#E1E4E8"},children:"  </"}),n(o.span,{style:{color:"#85E89D"},children:"p"}),n(o.span,{style:{color:"#E1E4E8"},children:">"})]}),"\\n",t(o.span,{"data-line":"",children:[n(o.span,{style:{color:"#E1E4E8"},children:"</"}),n(o.span,{style:{color:"#85E89D"},children:"article"}),n(o.span,{style:{color:"#E1E4E8"},children:">"})]})]})})}),"\\n",t(o.p,{children:["For more information about how to use the plugin and the features it includes, ",n(o.a,{href:"https://github.com/tailwindcss/typography/blob/master/README.md",children:"read the documentation"}),"."]}),"\\n",n(o.hr,{}),"\\n",t(o.h2,{id:"what-to-expect-from-here-on-out",children:["What to expect from here on out",n(o.a,{"aria-hidden":"true",tabIndex:"-1",href:"#what-to-expect-from-here-on-out",children:n(o.span,{className:"icon icon-link"})})]}),"\\n",t(o.p,{children:["What follows from here is just a bunch of absolute nonsense I\'ve written to dogfood the plugin itself. It includes every sensible typographic element I could think of, like ",n(o.strong,{children:"bold text"}),", unordered lists, ordered lists, code blocks, block quotes, ",n(o.em,{children:"and even italics"}),"."]}),"\\n",n(o.p,{children:"It\'s important to cover all of these use cases for a few reasons:"}),"\\n",t(o.ol,{children:["\\n",n(o.li,{children:"We want everything to look good out of the box."}),"\\n",n(o.li,{children:"Really just the first reason, that\'s the whole point of the plugin."}),"\\n",n(o.li,{children:"Here\'s a third pretend reason though a list with three items looks more realistic than a list with two items."}),"\\n"]}),"\\n",n(o.p,{children:"Now we\'re going to try out another header style."}),"\\n",t(o.h3,{id:"typography-should-be-easy",children:["Typography should be easy",n(o.a,{"aria-hidden":"true",tabIndex:"-1",href:"#typography-should-be-easy",children:n(o.span,{className:"icon icon-link"})})]}),"\\n",n(o.p,{children:"So that\'s a header for you — with any luck if we\'ve done our job correctly that will look pretty reasonable."}),"\\n",n(o.p,{children:"Something a wise person once told me about typography is:"}),"\\n",t(o.blockquote,{children:["\\n",n(o.p,{children:"Typography is pretty important if you don\'t want your stuff to look like trash. Make it good then it won\'t be bad."}),"\\n"]}),"\\n",n(o.p,{children:"It\'s probably important that images look okay here by default as well:"}),"\\n",n(a,{src:"/blogs/c-d-x-PDX_a_82obo-unsplash-55192b8a.jpg",width:"718",height:"404",alt:"Image",sizes:"100vw"}),"\\n",n(o.p,{children:"Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old."}),"\\n",n(o.p,{children:"Now I\'m going to show you an example of an unordered list to make sure that looks good, too:"}),"\\n",t(o.ul,{children:["\\n",n(o.li,{children:"So here is the first item in this list."}),"\\n",n(o.li,{children:"In this example we\'re keeping the items short."}),"\\n",n(o.li,{children:"Later, we\'ll use longer, more complex list items."}),"\\n"]}),"\\n",n(o.p,{children:"And that\'s the end of this section."}),"\\n",t(o.h2,{id:"what-if-we-stack-headings",children:["What if we stack headings?",n(o.a,{"aria-hidden":"true",tabIndex:"-1",href:"#what-if-we-stack-headings",children:n(o.span,{className:"icon icon-link"})})]}),"\\n",t(o.h3,{id:"we-should-make-sure-that-looks-good-too",children:["We should make sure that looks good, too.",n(o.a,{"aria-hidden":"true",tabIndex:"-1",href:"#we-should-make-sure-that-looks-good-too",children:n(o.span,{className:"icon icon-link"})})]}),"\\n",n(o.p,{children:"Sometimes you have headings directly underneath each other. In those cases you often have to undo the top margin on the second heading because it usually looks better for the headings to be closer together than a paragraph followed by a heading should be."}),"\\n",t(o.h3,{id:"when-a-heading-comes-after-a-paragraph-",children:["When a heading comes after a paragraph …",n(o.a,{"aria-hidden":"true",tabIndex:"-1",href:"#when-a-heading-comes-after-a-paragraph-",children:n(o.span,{className:"icon icon-link"})})]}),"\\n",n(o.p,{children:"When a heading comes after a paragraph, we need a bit more space, like I already mentioned above. Now let\'s see what a more complex list would look like."}),"\\n",t(o.ul,{children:["\\n",t(o.li,{children:["\\n",n(o.p,{children:n(o.strong,{children:"I often do this thing where list items have headings."})}),"\\n",n(o.p,{children:"For some reason I think this looks cool which is unfortunate because it\'s pretty annoying to get the styles right."}),"\\n",n(o.p,{children:"I often have two or three paragraphs in these list items, too, so the hard part is getting the spacing between the paragraphs, list item heading, and separate list items to all make sense. Pretty tough honestly, you could make a strong argument that you just shouldn\'t write this way."}),"\\n"]}),"\\n",t(o.li,{children:["\\n",n(o.p,{children:n(o.strong,{children:"Since this is a list, I need at least two items."})}),"\\n",n(o.p,{children:"I explained what I\'m doing already in the previous list item, but a list wouldn\'t be a list if it only had one item, and we really want this to look realistic. That\'s why I\'ve added this second list item so I actually have something to look at when writing the styles."}),"\\n"]}),"\\n",t(o.li,{children:["\\n",n(o.p,{children:n(o.strong,{children:"It\'s not a bad idea to add a third item either."})}),"\\n",n(o.p,{children:"I think it probably would\'ve been fine to just use two items but three is definitely not worse, and since I seem to be having no trouble making up arbitrary things to type, I might as well include it."}),"\\n"]}),"\\n"]}),"\\n",n(o.p,{children:"After this sort of list I usually have a closing statement or paragraph, because it kinda looks weird jumping right to a heading."}),"\\n",t(o.h2,{id:"code-should-look-okay-by-default",children:["Code should look okay by default.",n(o.a,{"aria-hidden":"true",tabIndex:"-1",href:"#code-should-look-okay-by-default",children:n(o.span,{className:"icon icon-link"})})]}),"\\n",t(o.p,{children:["I think most people are going to use ",n(o.a,{href:"https://highlightjs.org/",children:"highlight.js"})," or ",n(o.a,{href:"https://prismjs.com/",children:"Prism"})," or something if they want to style their code blocks but it wouldn\'t hurt to make them look ",n(o.em,{children:"okay"})," out of the box, even with no syntax highlighting."]}),"\\n",t(o.p,{children:["Here\'s what a default ",n(o.code,{children:"tailwind.config.js"})," file looks like at the time of writing:"]}),"\\n",n(o.figure,{"data-rehype-pretty-code-figure":"",children:n(o.pre,{style:{backgroundColor:"#24292e",color:"#e1e4e8"},tabIndex:"0","data-language":"js","data-theme":"github-dark",children:t(o.code,{"data-language":"js","data-theme":"github-dark",children:[t(o.span,{"data-line":"",children:[n(o.span,{style:{color:"#79B8FF"},children:"module"}),n(o.span,{style:{color:"#E1E4E8"},children:"."}),n(o.span,{style:{color:"#79B8FF"},children:"exports"}),n(o.span,{style:{color:"#F97583"},children:" ="}),n(o.span,{style:{color:"#E1E4E8"},children:" {"})]}),"\\n",n(o.span,{"data-line":"",children:n(o.span,{style:{color:"#E1E4E8"},children:"  purge: [],"})}),"\\n",n(o.span,{"data-line":"",children:n(o.span,{style:{color:"#E1E4E8"},children:"  theme: {"})}),"\\n",n(o.span,{"data-line":"",children:n(o.span,{style:{color:"#E1E4E8"},children:"    extend: {},"})}),"\\n",n(o.span,{"data-line":"",children:n(o.span,{style:{color:"#E1E4E8"},children:"  },"})}),"\\n",n(o.span,{"data-line":"",children:n(o.span,{style:{color:"#E1E4E8"},children:"  variants: {},"})}),"\\n",n(o.span,{"data-line":"",children:n(o.span,{style:{color:"#E1E4E8"},children:"  plugins: [],"})}),"\\n",n(o.span,{"data-line":"",children:n(o.span,{style:{color:"#E1E4E8"},children:"};"})})]})})}),"\\n",n(o.p,{children:"Hopefully that looks good enough to you."}),"\\n",t(o.h3,{id:"what-about-nested-lists",children:["What about nested lists?",n(o.a,{"aria-hidden":"true",tabIndex:"-1",href:"#what-about-nested-lists",children:n(o.span,{className:"icon icon-link"})})]}),"\\n",n(o.p,{children:"Nested lists basically always look bad which is why editors like Medium don\'t even let you do it, but I guess since some of you goofballs are going to do it we have to carry the burden of at least making it work."}),"\\n",t(o.ol,{children:["\\n",t(o.li,{children:[n(o.strong,{children:"Nested lists are rarely a good idea."}),"\\n",t(o.ul,{children:["\\n",n(o.li,{children:\'You might feel like you are being really "organized" or something but you are just creating a gross shape on the screen that is hard to read.\'}),"\\n",n(o.li,{children:"Nested navigation in UIs is a bad idea too, keep things as flat as possible."}),"\\n",n(o.li,{children:"Nesting tons of folders in your source code is also not helpful."}),"\\n"]}),"\\n"]}),"\\n",t(o.li,{children:[n(o.strong,{children:"Since we need to have more items, here\'s another one."}),"\\n",t(o.ul,{children:["\\n",n(o.li,{children:"I\'m not sure if we\'ll bother styling more than two levels deep."}),"\\n",n(o.li,{children:"Two is already too much, three is guaranteed to be a bad idea."}),"\\n",n(o.li,{children:"If you nest four levels deep you belong in prison."}),"\\n"]}),"\\n"]}),"\\n",t(o.li,{children:[n(o.strong,{children:"Two items isn\'t really a list, three is good though."}),"\\n",t(o.ul,{children:["\\n",n(o.li,{children:"Again please don\'t nest lists if you want people to actually read your content."}),"\\n",n(o.li,{children:"Nobody wants to look at this."}),"\\n",n(o.li,{children:"I\'m upset that we even have to bother styling this."}),"\\n"]}),"\\n"]}),"\\n"]}),"\\n",t(o.p,{children:["The most annoying thing about lists in Markdown is that ",n(o.code,{children:"<li>"})," elements aren\'t given a child ",n(o.code,{children:"<p>"})," tag unless there are multiple paragraphs in the list item. That means I have to worry about styling that annoying situation too."]}),"\\n",t(o.ul,{children:["\\n",t(o.li,{children:["\\n",n(o.p,{children:n(o.strong,{children:"For example, here\'s another nested list."})}),"\\n",n(o.p,{children:"But this time with a second paragraph."}),"\\n",t(o.ul,{children:["\\n",t(o.li,{children:["These list items won\'t have ",n(o.code,{children:"<p>"})," tags"]}),"\\n",n(o.li,{children:"Because they are only one line each"}),"\\n"]}),"\\n"]}),"\\n",t(o.li,{children:["\\n",n(o.p,{children:n(o.strong,{children:"But in this second top-level list item, they will."})}),"\\n",n(o.p,{children:"This is especially annoying because of the spacing on this paragraph."}),"\\n",t(o.ul,{children:["\\n",t(o.li,{children:["\\n",t(o.p,{children:["As you can see here, because I\'ve added a second line, this list item now has a ",n(o.code,{children:"<p>"})," tag."]}),"\\n",n(o.p,{children:"This is the second line I\'m talking about by the way."}),"\\n"]}),"\\n",t(o.li,{children:["\\n",n(o.p,{children:"Finally here\'s another list item so it\'s more like a list."}),"\\n"]}),"\\n"]}),"\\n"]}),"\\n",t(o.li,{children:["\\n",n(o.p,{children:"A closing list item, but with no nested list, because why not?"}),"\\n"]}),"\\n"]}),"\\n",n(o.p,{children:"And finally a sentence to close off this section."}),"\\n",t(o.h2,{id:"there-are-other-elements-we-need-to-style",children:["There are other elements we need to style",n(o.a,{"aria-hidden":"true",tabIndex:"-1",href:"#there-are-other-elements-we-need-to-style",children:n(o.span,{className:"icon icon-link"})})]}),"\\n",t(o.p,{children:["I almost forgot to mention links, like ",n(o.a,{href:"https://tailwindcss.com",children:"this link to the Tailwind CSS website"}),". We almost made them blue but that\'s so yesterday, so we went with dark gray, feels edgier."]}),"\\n",n(o.p,{children:"We even included table styles, check it out:"}),"\\n",t(o.table,{children:[n(o.thead,{children:t(o.tr,{children:[n(o.th,{children:"Wrestler"}),n(o.th,{children:"Origin"}),n(o.th,{children:"Finisher"})]})}),t(o.tbody,{children:[t(o.tr,{children:[n(o.td,{children:\'Bret "The Hitman" Hart\'}),n(o.td,{children:"Calgary, AB"}),n(o.td,{children:"Sharpshooter"})]}),t(o.tr,{children:[n(o.td,{children:"Stone Cold Steve Austin"}),n(o.td,{children:"Austin, TX"}),n(o.td,{children:"Stone Cold Stunner"})]}),t(o.tr,{children:[n(o.td,{children:"Randy Savage"}),n(o.td,{children:"Sarasota, FL"}),n(o.td,{children:"Elbow Drop"})]}),t(o.tr,{children:[n(o.td,{children:"Vader"}),n(o.td,{children:"Boulder, CO"}),n(o.td,{children:"Vader Bomb"})]}),t(o.tr,{children:[n(o.td,{children:"Razor Ramon"}),n(o.td,{children:"Chuluota, FL"}),n(o.td,{children:"Razor\'s Edge"})]})]})]}),"\\n",t(o.p,{children:["We also need to make sure inline code looks good, like if I wanted to talk about ",n(o.code,{children:"<span>"})," elements or tell you the good news about ",n(o.code,{children:"@tailwindcss/typography"}),"."]}),"\\n",t(o.h3,{id:"sometimes-i-even-use-code-in-headings",children:["Sometimes I even use ",n(o.code,{children:"code"})," in headings",n(o.a,{"aria-hidden":"true",tabIndex:"-1",href:"#sometimes-i-even-use-code-in-headings",children:n(o.span,{className:"icon icon-link"})})]}),"\\n",t(o.p,{children:["Even though it\'s probably a bad idea, and historically I\'ve had a hard time making it look good. This ",n(o.em,{children:\'"wrap the code blocks in backticks"\'})," trick works pretty well though really."]}),"\\n",t(o.p,{children:["Another thing I\'ve done in the past is put a ",n(o.code,{children:"code"})," tag inside of a link, like if I wanted to tell you about the ",n(o.a,{href:"https://github.com/tailwindcss/docs",children:n(o.code,{children:"tailwindcss/docs"})})," repository. I don\'t love that there is an underline below the backticks but it is absolutely not worth the madness it would require to avoid it."]}),"\\n",t(o.h4,{id:"we-havent-used-an-h4-yet",children:["We haven\'t used an ",n(o.code,{children:"h4"})," yet",n(o.a,{"aria-hidden":"true",tabIndex:"-1",href:"#we-havent-used-an-h4-yet",children:n(o.span,{className:"icon icon-link"})})]}),"\\n",t(o.p,{children:["But now we have. Please don\'t use ",n(o.code,{children:"h5"})," or ",n(o.code,{children:"h6"})," in your content, Medium only supports two heading levels for a reason, you animals. I honestly considered using a ",n(o.code,{children:"before"})," pseudo-element to scream at you if you use an ",n(o.code,{children:"h5"})," or ",n(o.code,{children:"h6"}),"."]}),"\\n",t(o.p,{children:["We don\'t style them at all out of the box because ",n(o.code,{children:"h4"})," elements are already so small that they are the same size as the body copy. What are we supposed to do with an ",n(o.code,{children:"h5"}),", make it ",n(o.em,{children:"smaller"})," than the body copy? No thanks."]}),"\\n",t(o.h3,{id:"we-still-need-to-think-about-stacked-headings-though",children:["We still need to think about stacked headings though.",n(o.a,{"aria-hidden":"true",tabIndex:"-1",href:"#we-still-need-to-think-about-stacked-headings-though",children:n(o.span,{className:"icon icon-link"})})]}),"\\n",t(o.h4,{id:"lets-make-sure-we-dont-screw-that-up-with-h4-elements-either",children:["Let\'s make sure we don\'t screw that up with ",n(o.code,{children:"h4"})," elements, either.",n(o.a,{"aria-hidden":"true",tabIndex:"-1",href:"#lets-make-sure-we-dont-screw-that-up-with-h4-elements-either",children:n(o.span,{className:"icon icon-link"})})]}),"\\n",n(o.p,{children:"Phew, with any luck we have styled the headings above this text and they look pretty good."}),"\\n",n(o.p,{children:"Let\'s add a closing paragraph here so things end with a decently sized block of text. I can\'t explain why I want things to end that way but I have to assume it\'s because I think things will look weird or unbalanced if there is a heading too close to the end of the document."}),"\\n",n(o.p,{children:"What I\'ve written here is probably long enough, but adding this final sentence can\'t hurt."}),"\\n",t(o.h2,{id:"github-flavored-markdown",children:["GitHub Flavored Markdown",n(o.a,{"aria-hidden":"true",tabIndex:"-1",href:"#github-flavored-markdown",children:n(o.span,{className:"icon icon-link"})})]}),"\\n",t(o.p,{children:["I\'ve also added support for GitHub Flavored Mardown using ",n(o.code,{children:"remark-gfm"}),"."]}),"\\n",t(o.p,{children:["With ",n(o.code,{children:"remark-gfm"}),", we get a few extra features in our markdown. Example: autolink literals."]}),"\\n",t(o.p,{children:["A link like ",n(o.a,{href:"http://www.example.com",children:"www.example.com"})," or ",n(o.a,{href:"https://example.com",children:"https://example.com"})," would automatically be converted into an ",n(o.code,{children:"a"})," tag."]}),"\\n",t(o.p,{children:["This works for email links too: ",n(o.a,{href:"mailto:contact@example.com",children:"contact@example.com"}),"."]})]})}return{default:function(e={}){const{wrapper:t}=e.components||{};return t?n(t,{...e,children:n(_createMdxContent,{...e})}):_createMdxContent(e)}};',
    toc: [
      {
        title: "What to expect from here on out",
        url: "#what-to-expect-from-here-on-out",
        items: [
          {
            title: "Typography should be easy",
            url: "#typography-should-be-easy",
            items: [],
          },
        ],
      },
      {
        title: "What if we stack headings?",
        url: "#what-if-we-stack-headings",
        items: [
          {
            title: "We should make sure that looks good, too.",
            url: "#we-should-make-sure-that-looks-good-too",
            items: [],
          },
          {
            title: "When a heading comes after a paragraph …",
            url: "#when-a-heading-comes-after-a-paragraph-",
            items: [],
          },
        ],
      },
      {
        title: "Code should look okay by default.",
        url: "#code-should-look-okay-by-default",
        items: [
          {
            title: "What about nested lists?",
            url: "#what-about-nested-lists",
            items: [],
          },
        ],
      },
      {
        title: "There are other elements we need to style",
        url: "#there-are-other-elements-we-need-to-style",
        items: [
          {
            title: "Sometimes I even use code in headings",
            url: "#sometimes-i-even-use-code-in-headings",
            items: [
              {
                title: "We haven't used an h4 yet",
                url: "#we-havent-used-an-h4-yet",
                items: [],
              },
            ],
          },
          {
            title: "We still need to think about stacked headings though.",
            url: "#we-still-need-to-think-about-stacked-headings-though",
            items: [
              {
                title:
                  "Let's make sure we don't screw that up with h4 elements, either.",
                url: "#lets-make-sure-we-dont-screw-that-up-with-h4-elements-either",
                items: [],
              },
            ],
          },
        ],
      },
      {
        title: "GitHub Flavored Markdown",
        url: "#github-flavored-markdown",
        items: [],
      },
    ],
    slug: "automating-repetitive-tasks-productivity-hacks-for-developers",
    url: "/blogs/automating-repetitive-tasks-productivity-hacks-for-developers",
    readingTime: {
      text: "9 min read",
      minutes: 8.59,
      time: 515400,
      words: 1718,
    },
  };

  return (
    <div className="w-full inline-block">
      <article className="flex flex-col items-start justify-end mx-5 sm:mx-10 relative h-[60vh] sm:h-[85vh]">
        <div
          className="absolute top-0 left-0 bottom-0 right-0 h-full
            bg-gradient-to-b from-transparent from-0% to-dark/90 rounded-3xl z-0
            "
        />
        <Image 
          src={blog.image.src}
          placeholder="blur"
          blurDataURL={blog.image.blurDataURL}
          alt={blog.title}
          fill
          className="w-full h-full object-center object-cover rounded-3xl -z-10"
          sizes="100vw"
          priority
        />

        <div className="w-full lg:w-3/4 p-6 sm:p-8 md:p-12  lg:p-16 flex flex-col items-start justify-center z-0 text-light">
          <Tag link={`/categories/${slug(blog.tags[0])}`} name={blog.tags[0]} />
          <Link href={blog.url} className="mt-6">
            <h1 className="font-bold capitalize text-lg sm:text-xl md:text-3xl lg:text-4xl">
              <span
                className="bg-gradient-to-r from-accent to-accent dark:from-accentDark/50 
                dark:to-accentDark/50 bg-[length:0px_6px]
                hover:bg-[length:100%_6px] bg-left-bottom bg-no-repeat transition-[background-size] duration-500 "
              >
                {blog.title}
              </span>
            </h1>
          </Link>
          <p className="hidden  sm:inline-block mt-4 md:text-lg lg:text-xl font-in">
            {blog.description}
          </p>
        </div>
      </article>
    </div>
  );
};

export default HomeCoverSection;
