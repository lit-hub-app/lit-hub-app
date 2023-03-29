import axios from 'axios';
import parse, { domToReact } from 'html-react-parser';
import type { BookType } from '@/common/types';

const BOOK_COUNT = 100000;
type Props = {
  html: [],
}


function parseHTML(htmlString) {

  const options = {
    replace: (node) => {
      const { attribs, name, type, children } = node;
      if (attribs) {
        const { id } = attribs;
        if (id) {
          // console.log(id, Object.keys(attribs), name, type);
          return <div className='html-parsed'>{children}</div>
        }
      }
    }
  };

  const components = parse(htmlString, options);
  console.log(components)
  return components;
}



export default function Book({ html }: Props) {
  // console.log(typeof html)
  return (

    <div className='page-container'>
      <h1 className='page-header'>Reader</h1>
      <div className='page-content'>
        <div className='reader-content'>
          {/* {
            html ?
              html.map((node, i) => {
                return parse(node)
              })
              : <></>
          } */}
          {
            parseHTML(html)
          }
        </div>
      </div>
    </div>


  );
};

// export async function getStaticPaths() {
//   // const paths = getAllPostIds()
//   const paths: Array<string> = [];
//   for (let i = 0; i < BOOK_COUNT; i++) {
//     paths.push(`/reader/${i}`);
//   }
//   return {
//     paths,
//     fallback: false
//   }
// };

// export async function getStaticProps({ params }) {

//   console.log(params.id)

//   const response = await axios.get(`https://gutendex.com/books/${params.id}`);
//   const bookData = await response.data;

//   const bookContent = bookData.formats['text/html'];

//   const response2 = await axios.get(bookContent);
//   const htmlString = await response2.data;

//   const htmlArray = htmlString.split('\n');

//   // console.log(htmlString.substring(0, 16));
//   // console.log(htmlArray[1])

//   const elements = [];
//   let saveElement = false;

//   for (let i = 0; i < htmlArray.length; i++) {

//     const item = htmlArray[i];

//     if (item.match(/<body/)) {
//       saveElement = true;
//     }

//     if (saveElement) {
//       elements.push(item)
//     }

//   }

//   // const htmlJson = JSON.stringify(elements)

//   // console.log(htmlJson)
//   // console.log(elements);

//   // console.log(typeof htmlString)
//   // console.log(bookData)
//   // const postData = [];

//   // const options = {
//   //   replace: (node) => {
//   //     const { attribs, name, type, children } = node;
//   //     if (attribs) {
//   //       const { id } = attribs;
//   //       if (id) {
//   //         console.log(id, Object.keys(attribs), name, type);
//   //         return <div className='html-parsed'>{children}</div>
//   //       }

//   //       return

//   //     }
//   //   }
//   // };

//   // const elements = parse(htmlString, options);
//   // console.log(elements[1].props.children[1].props)
//   // const htmlArray = elements[1].props.children[1].props;
//   // const html = JSON.stringify(htmlArray);
//   // const html = JSON.parse(JSON.stringify(elements));

//   return {
//     props: {
//       html: elements
//     }
//   }
// };


export async function getServerSideProps({ params }) {
  console.log(params.id)

  const response = await axios.get(`https://gutendex.com/books/${params.id}`);
  const bookData = await response.data;

  const bookContent = bookData.formats['text/html'];

  const response2 = await axios.get(bookContent);
  const htmlString = await response2.data;

  // My parser
  const elements = [];
  let saveElement = false;
  const htmlArray = htmlString.split('\n');
  for (let i = 0; i < htmlArray.length; i++) {
    const item = htmlArray[i];
    if (item.match(/<body/)) {
      saveElement = true;
    }
    if (saveElement) {
      elements.push(item)
    }
  }
  const elementsString = elements.join('');

  // html-react-parser
  // const options = {
  //   replace: (node) => {
  //     const { attribs, name, type, children } = node;
  //     if (attribs) {
  //       const { id } = attribs;
  //       if (id) {
  //         console.log(id, Object.keys(attribs), name, type);
  //         return <div className='html-parsed'>{children}</div>
  //       }
  //     }
  //   }
  // };
  // const parsedElements = parse(htmlString);


  return {
    props: {
      html: elementsString
    }
  }
};