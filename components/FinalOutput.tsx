import { usePositionInfoListStore } from "@/hooks/usePositionInfoListStore";
import Link from "next/link";

export const FinalOutput = () => {
  const positionInfoList = usePositionInfoListStore(
    (state) => state.positionInfoList
  );

  const capitalize = (str: string) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  };

  return (
    <div className="flex flex-col h-full">
      <h3 className="text-lg font-semibold mb-2">Final Output</h3>
      <div className="p-2 grow overflow-y-auto border-2 border-gray-300 rounded-md ">
        {positionInfoList.length === 0 ? (
          <p className="text-gray-500">No positions found yet.</p>
        ) : (
          positionInfoList.map((positionInfo, index) => (
            <div key={index} className="mb-4">
              <div className="flex flex-col gap-2">
                <p>
                  <strong>Company: </strong>
                  {capitalize(positionInfo.company)}
                </p>
                <p>
                  <strong>Position: </strong>
                  {capitalize(positionInfo.position)}
                </p>
                <p>
                  <strong>Name: </strong>
                  {capitalize(positionInfo.name)}
                </p>
                <div>
                  <strong>Blog Articles: </strong>
                  <ul className="list-disc list-inside">
                    {positionInfo.blog_articles.map((url, index) => (
                      <li key={index}>
                        <Link
                          href={url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-500 hover:underline"
                        >
                          {url}
                        </Link>
                      </li>
                    ))}
                    {positionInfo.blog_articles.length === 0 && (
                      <li className="text-gray-500">
                        No blog articles found yet.
                      </li>
                    )}
                  </ul>
                </div>
                <div>
                  <strong>Youtube Interviews: </strong>
                  <ul className="list-disc list-inside">
                    {positionInfo.youtube_interviews.map((video, index) => (
                      <li key={index}>
                        <Link
                          href={video.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-500 hover:underline"
                        >
                          {video.name}
                        </Link>
                      </li>
                    ))}
                    {positionInfo.youtube_interviews.length === 0 && (
                      <li className="text-gray-500">
                        No youtube interviews found yet.
                      </li>
                    )}
                  </ul>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};
