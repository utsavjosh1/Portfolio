import fs from "fs";
import * as path from "path";

function createRobot(name: string): void {
  const robotTemplate = `import { ${name} } from "./${name}";

export default ${name};
`;
  const robotFilePath = path.join(process.cwd(), "robots", `${name}.ts`);
  fs.writeFileSync(robotFilePath, robotTemplate, { encoding: "utf8" });
}
