import { useTheme } from "next-themes";
import GitHubCalendar from "react-github-calendar";

const GitHubCalendarComponent = () => {
  // const { theme } = useTheme();

  return (
    <div className="flex flex-col justify-center text-slate-300 overflow-auto p-4">
      {/* Section Title */}
      <h2 className="text-lg md:text-xl font-bold text-center mb-4">
        GitHub Contributions
      </h2>

      {/* Calendar Container */}
      <div className="flex justify-center overflow-auto w-full border-2 border-green-500 p-2">
        <div className="flex justify-center border-5 border-purple-500">
          <GitHubCalendar
            username={"joshiUtsav"}
            blockSize={10}
            blockMargin={5}
            style={{
              width: "100%",
              maxWidth: "100%", 
              height: "auto",
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default GitHubCalendarComponent;
