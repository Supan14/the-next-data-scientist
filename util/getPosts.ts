import { compileMDX } from 'next-mdx-remote/rsc'
import rehypeAutolinkHeadings from 'rehype-autolink-headings/lib'
import rehypeHighlight from 'rehype-highlight/lib'
import rehypeSlug from 'rehype-slug'
import Video from '@/app/components/Video'
import CustomImage from '@/app/components/CustomImage'

type Filetree = {
    "tree": [
        {
            "path": string,
        }
    ]
}

export async function getPostByName(fileName: string): Promise<BlogPost | undefined> {
    const res = await fetch(`https://raw.githubusercontent.com/Supan14/the-next-data-scientist-posts/main/${fileName}`, {
        headers: {
            Accept: 'application/vnd.github+json',
            Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
            'X-GitHub-Api-Version': '2022-11-28',
        }
    })

    if (!res.ok) undefined

    const rawMDX = await res.text()

    if (rawMDX === '404: Not Found') return undefined

    const { frontmatter, content } = await compileMDX<{ title: string, date: string, tags: string[] }>({
        source: rawMDX,
        components: {
            Video,
            CustomImage,
        },
        options: {
            parseFrontmatter: true,
            mdxOptions: {
                rehypePlugins: [
                    rehypeHighlight,
                    rehypeSlug,
                    [rehypeAutolinkHeadings, {
                        behavior: 'wrap'
                    }],
                ],
            },
        }
    })

    const id = fileName.replace(/\.mdx$/, '')

    const blogPostObj: BlogPost = { meta: { id, title: frontmatter.title }, content }

    return blogPostObj
}

export async function getPostsHierarchy(): Promise<SubjectDict | undefined> {
    const res = await fetch('https://api.github.com/repos/Supan14/the-next-data-scientist-posts/git/trees/main?recursive=1', {
        headers: {
            Accept: 'application/vnd.github+json',
            Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
            'X-GitHub-Api-Version': '2022-11-28',
        }
    })

    if (!res.ok) return undefined

    const repoFiletree: Filetree = await res.json()

    const filesArray = repoFiletree.tree.map(obj => obj.path).filter(path => path.endsWith('.mdx'))

    const hierarchy: SubjectDict = {}

    for (const filePath of filesArray) {
        const post = await getPostByName(filePath)

        if (!post) continue
        // const { meta } = post

        const pathParts = filePath.split('/')
        let currentLevel = hierarchy

        pathParts.forEach((part, index) => {
            if (index === pathParts.length - 1) {
                const postName = post.meta.title
                if (!currentLevel[postName]) {
                    currentLevel[postName] = post;
                }
            } else {
                if (!currentLevel[part]) {
                    currentLevel[part] = {};
                }
                currentLevel = currentLevel[part] as SubjectDict;
            }
        });
    }

    return hierarchy;
}

        // pathParts.forEach((part, index) => {
        //     if (index === pathParts.length - 2) {
        //         if (!currentLevel[part]) {
        //             currentLevel[part] = [];
        //         }
        //         (currentLevel[part] as Meta[]).push(meta)
        //     } else {
        //         currentLevel[part] ||= {};
        //         currentLevel = currentLevel[part] as SubjectDict;
        //     }
        // })
//     }
// return hierarchy
// }

// export async function getPostsMeta() {}

// export async function getPostsHierarchy(): Promise<DirectoryTree | undefined> {
//     const res = await fetch('https://api.github.com/repos/Supan14/the-next-data-scientist-posts/git/trees/main?recursive=1', {
//         headers: {
//             Accept: 'application/vnd.github+json',
//             Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
//             'X-GitHub-Api-Version': '2022-11-28',
//         }
//     })

//     if (!res.ok) return undefined

//     const repoFiletree: Filetree = await res.json()

//     const filesArray = repoFiletree.tree.map(obj => obj.path).filter(path => path.endsWith('.mdx'))

//     const mdxDirectories: DirectoryTree = {}

//     for (const filePath of filesArray) {
//         const directories = filePath.split('/')
//         let currentDict = mdxDirectories

//         for (let i = 0; i < directories.length - 1; i++) {
//             const directory = directories[i]

//             if (!currentDict[directory]) {
//                 currentDict[directory] = {}
//             }

//             currentDict = currentDict[directory] as DirectoryTree
//         }

//         const fileName = directories[directories.length - 1]
//         currentDict[fileName] = {}
//     }
//     return mdxDirectories
// }