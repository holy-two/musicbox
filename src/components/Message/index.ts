import { sleep } from "𝄞/utils";

export class Launcher {
  private queue: HTMLDivElement;
  constructor(parentElement: HTMLElement = document.body) {
    this.queue = document.createElement("div");
    this.queue.className = `na-message-queue`;
    parentElement.append(this.queue);
  }
  async emit(
    detail:
      | string
      | {
          /**
           * 内容 相当于直接传string
           */
          content?: string;
          /**
           * 主题 4种 其他非空值等效于传primary
           */
          primary?: "success" | "danger" | "warning" | "primary";
          /**
           * 持续时间
           */
          duration?: number;
          /**
           * 额外的样式 需要设置primary后才生效
           */
          style?: Record<string, string>;
        }
  ) {
    const msg = document.createElement("div");
    let duration: number = 2000;
    let primary: string = "";
    let style: Record<string, string> = {};
    let content = detail ?? "☘";
    if (typeof content != "string") {
      duration = content.duration ?? 2000;
      primary = `${content.primary ?? ""}`;
      style = content.style ?? {};
      content = `${content.content ?? "☘"}`;
    }
    msg.innerHTML = `
      <div class="na-message">
        <p class="na-paragraph">${content}</p>
      </div>
    `;
    if (primary) {
      const p = msg.firstElementChild as HTMLDivElement;
      p.dataset.primary = primary;
      Object.entries(style).map((x) => p.style.setProperty(...x));
    }
    this.queue.appendChild(msg);
    msg.style.height = `${msg.offsetHeight}px`;
    msg.style.transition = "opacity 1s, height 2s";
    await sleep(duration);
    msg.style.opacity = "0";
    msg.style.height = "0";
    await sleep(2000); // 2000对应 transition height 2s
    this.queue.removeChild(msg);
  }
}

const body = new Launcher();

export default (...args: Parameters<typeof body.emit>) => body.emit(...args);
