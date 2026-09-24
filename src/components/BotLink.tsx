import { botLink } from "@/lib/bot";

type Props = React.AnchorHTMLAttributes<HTMLAnchorElement> & { param: string; block?: string };

/**
 * Ссылка на бота. href формируется botLink(param); клиентский SiteScripts дописывает
 * суффикс источника из UTM и отправляет цель bot_click (page, block, start_param).
 */
export default function BotLink({ param, block, children, ...rest }: Props) {
  return (
    <a href={botLink(param)} data-bot={param} data-block={block} target="_blank" rel="noopener" {...rest}>
      {children}
    </a>
  );
}
