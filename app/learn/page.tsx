import { getPostsHierarchy } from "@/util/getPosts"
import Link from "next/link"
import Particles from "../components/particles";
import { navigation } from "../page";
import SubjectCard from "../components/SubjectCard";

// export default function Learn({ hierarchy }: LearnProps) {
//     return (
//         <section>
//             <h1>Learn</h1>
//             {Object.entries(hierarchy).map(([subject, postsOrSubSubjects]) => (
//                 <div key={subject}>
//                     <h2>{subject}</h2>
//                     {Array.isArray(postsOrSubSubjects) ? (
//                         postsOrSubSubjects.map((post) => (
//                             <Link href={`#${post.id}`} key={post.id}>
//                                 <a>{post.title}</a>
//                             </Link>
//                         ))
//                     ) : (
//                         Object.keys(postsOrSubSubjects).map((subSubject) => (
//                             <div key={subSubject}>
//                                 <h3>{subSubject}</h3>
//                                 {postsOrSubSubjects[subSubject].map((post: Meta) => (
//                                     <Link href={`#${post.id}`} key={post.id}>
//                                         <a>{post.title}</a>
//                                     </Link>
//                                 ))}
//                             </div>
//                         ))
//                     )}
//                 </div>
//             ))}
//         </section>
//     );
// }

// export default async function Learn() {
//     const hierarchy = await getPostsHierarchy();
//     if (!hierarchy) return null;

//     const renderHierarchy = (level: SubjectDict | Meta, depth = 1) => (
// <ul>
//     {Object.entries(level).map(([name, content]) => (
//         <li key={name}>
//             {depth === 1 ? <h2>{name}</h2> : depth === 2 ? <h3>{name}</h3> : depth === 3 ? <h4>{name}</h4> : depth === 4 ? <h5>{name}</h5> : <h6>{name}</h6>}
//             {typeof content === "object" ? (
//                 renderHierarchy(content, depth + 1)
//             ) : (
//                 <Link href={`${content.id}`}>
//                     {content.title}
//                 </Link>
//             )}
//         </li>
//     ))}
// </ul>
//     )

//     return (
//         <section className="bg-white text-black">
//             <h1>Learn</h1>
//             {renderHierarchy(hierarchy)}
//         </section>
//     );
// }

export default async function LearnPage() {
    const hierarchy = await getPostsHierarchy();
    if (!hierarchy) return undefined
    // console.log(hierarchy)

    // const renderHierarchy = (level: SubjectDict | BlogPost, depth = 1) => (
    //     <ul>
    //         {Object.entries(level).map([pathName, content]) => (
    //             <li key={pathName}>

    //             </li>
    //         )}
    //     </ul>
    // )
    return (
        <div className="animate-title-top flex flex-col items-center justify-top w-screen h-screen overflow-hidden bg-gradient-to-tl from-black via-zinc-600/20 to-black">
            <nav className="animate-title-top my-16">
                <ul className="flex items-center gap-4">
                    {navigation.map((item) => (
                        <Link
                            key={item.href}
                            href={item.href}
                            className="text-2xl duration-500 text-zinc-500 hover:text-zinc-300"
                        >
                            {item.name}
                        </Link>
                    ))}
                </ul>
            </nav>
            <div className="hidden w-screen h-px md:block bg-gradient-to-r from-zinc-300/0 via-zinc-300/50 to-zinc-300/0" />
            <Particles
                className="absolute inset-0 -z-10"
                quantity={500}
                staticity={10}
            />
            <Link
                key={'learn'}
                href={'learn'}
            >
                <h1 className="z-10 text-4xl text-transparent duration-1000 bg-white cursor-hand text-edge-outline font-display sm:text-6xl md:text-9xl whitespace-nowrap bg-clip-text">
                    The Next Data Scientist
                </h1>
            </Link>

            <div className="hidden w-screen h-px md:block bg-gradient-to-r from-zinc-300/0 via-zinc-300/50 to-zinc-300/0" />
            <div className="animate-fade-in my-16 text-center text-lg text-zinc-500 grid grid-cols-1 md:grid-cols-2 gap-8">
                {Object.entries(hierarchy).map(([name, content]) => (
                    <SubjectCard key={name} name={name} content={content} depth={1} />
                ))}
            </div>
        </div>
    )
}



// Sample working hierarchy
// <ul>
//     {Object.entries(level).map(([name, content]) => (
//         <li key={name}>
//             {depth === 1 ? <h2>{name}</h2> : depth === 2 ? <h3>{name}</h3> : depth === 3 ? <h4>{name}</h4> : depth === 4 ? <h5>{name}</h5> : <h6>{name}</h6>}
//             {typeof content === "object" ? (
//                 renderHierarchy(content, depth + 1)
//             ) : (
//                 <Link href={`${content.meta.id}`}>
//                     {content.meta.title}
//                 </Link>
//             )}
//         </li>
//     ))}
// </ul>