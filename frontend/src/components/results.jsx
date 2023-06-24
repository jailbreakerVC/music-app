// export function Results({ data }) {
//   if (data) {
//     return data.map((item) => {
//       console.log(item);
//       //  <div className="">
//       <div class="grid grid-cols-4 gap-4"></div>;

//       return (
//         // key = {item.video_id}
//         <div
//           className="card w-70 bg-base-90 shadow-xl mb-10"
//           key={item.video_id}
//         >
//           <img
//             className="rounded-lg"
//             src={`https://img.youtube.com/vi/${item.video_id}/hqdefault.jpg`}
//           />
//           <span className="mb-3"></span>
//           <h1 className="font-mono font-bold">{item.video_title}</h1>
//           <span className="mb-3"></span>
//           <button className="btn btn-accent">
//             Click here
//             {/* <a href={item.video_link}>Click here!</a> */}
//           </button>
//         </div>
//       ); //{" "}
//     });
//   }
// }

export function Results({ data }) {
  if (!data) {
    return null;
  }

  return data.map((item) => (
    <div className="card w-70 bg-base-90 shadow-xl mb-10" key={item.video_id}>
      <img
        className="rounded-lg"
        src={`https://img.youtube.com/vi/${item.video_id}/hqdefault.jpg`}
        alt=""
      />
      <span className="mb-3" />
      <h1 className="font-mono font-bold">{item.video_title}</h1>
      <span className="mb-3" />
      <button className="btn btn-accent">
        <a href={item.video_link} target="_blank" rel="noopener noreferrer">
          Click here
        </a>
      </button>
    </div>
  ));
}
