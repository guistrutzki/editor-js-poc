import Embed from '@editorjs/embed'
import Table from '@editorjs/table'
import Paragraph from '@editorjs/paragraph'
import List from '@editorjs/list'
import Warning from '@editorjs/warning'
import Code from '@editorjs/code'
import LinkTool from '@editorjs/link'
import Image from '@editorjs/image'
import Raw from '@editorjs/raw'
import Header from '@editorjs/header'
import Quote from '@editorjs/quote'
import Marker from '@editorjs/marker'
import CheckList from '@editorjs/checklist'
// import Delimiter from '@editorjs/delimiter'
import InlineCode from '@editorjs/inline-code'

import ImageWithText from './ImageWithText';

// import SimpleImage from './SimpleImage'

// const simpleImage = {
//     class: SimpleImage,
//     inlineToolbar: true,
//     config: {
//         placeholder: 'Paste image URL'
//     }
// }

const paragraph = {
    class: Paragraph,
    config: {
        inlineToolbar: true
    }
}

const header = {
    class: Header,
    inlineToolbar: true,
    config: {
        placeholder: 'Title...',
        defaultLevel: 0,
    }
}

const image = {
    class: Image,
    config: {
        uploader: {
            uploadByFile (file) {
                const fileReader = new FileReader();

                return new Promise((resolve, reject) => {
                    const localImageUrl = URL.createObjectURL(file)

                    fileReader.onload = () => {
                        const [meta, base64] = fileReader.result.split(',')
                        const [mimeType] = meta.split(':')[1].split(';')

                        resolve({
                            success: true,
                            file: {
                                url: localImageUrl,
                                mimeType,
                                base64,
                            }
                        })
                    }

                    fileReader.readAsDataURL(file);
                })
            },
            async uploadByUrl (url) {
                return {
                    success: true,
                    file: {
                        url,
                    }
                }
            }
        }
    }
}

const embed = {
    class: Embed,
    inlineToolbar: true,
}

export const EDITOR_JS_TOOLS = {
    paragraph,
    header,
    image,
    embed,
    quote: Quote,
    list: List,
    imageWithText: ImageWithText,
    code: Code,
    table: Table,
    warning: Warning,
    linkTool: LinkTool,
    raw: Raw,
    marker: Marker,
    checklist: CheckList,
    inlineCode: InlineCode,
}