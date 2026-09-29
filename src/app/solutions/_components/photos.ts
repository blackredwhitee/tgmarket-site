import psy1 from "@/assets/photos/sol/psychologists-1.jpg";
import psy2 from "@/assets/photos/sol/psychologists-2.jpg";
import psy3 from "@/assets/photos/sol/psychologists-3.jpg";
import exp1 from "@/assets/photos/sol/experts-1.jpg";
import exp2 from "@/assets/photos/sol/experts-2.jpg";
import exp3 from "@/assets/photos/sol/experts-3.jpg";
import inf1 from "@/assets/photos/sol/infoproducts-1.jpg";
import inf2 from "@/assets/photos/sol/infoproducts-2.jpg";
import inf3 from "@/assets/photos/sol/infoproducts-3.jpg";
import ev1 from "@/assets/photos/sol/events-1.jpg";
import ev2 from "@/assets/photos/sol/events-2.jpg";
import ev3 from "@/assets/photos/sol/events-3.jpg";
import don1 from "@/assets/photos/sol/donations-1.jpg";
import don2 from "@/assets/photos/sol/donations-2.jpg";
import avPsy from "@/assets/photos/sol/av-psychologists.jpg";
import avExp from "@/assets/photos/sol/av-experts.jpg";
import avInf from "@/assets/photos/sol/av-infoproducts.jpg";
import avEv from "@/assets/photos/sol/av-events.jpg";
import avDon from "@/assets/photos/sol/av-donations.jpg";

type Img = { src: string };
type Pair = { cover: Img; post: Img };
/** Фото ниши (Unsplash): аватар канала, обложки примеров (в порядке examples), телефоны hero и «Как это выглядит». */
export const NICHE_PHOTOS: Record<string, { avatar: Img; examples: Img[]; hero: Pair; looks: Pair }> = {
  psychologists: { avatar: avPsy, examples: [psy1, psy2, psy3], hero: { cover: psy1, post: psy3 }, looks: { cover: psy2, post: psy1 } },
  experts: { avatar: avExp, examples: [exp1, exp2, exp3], hero: { cover: exp1, post: exp3 }, looks: { cover: exp2, post: exp1 } },
  infoproducts: { avatar: avInf, examples: [inf1, inf2, inf3], hero: { cover: inf1, post: inf3 }, looks: { cover: inf3, post: inf2 } },
  events: { avatar: avEv, examples: [ev1, ev2, ev3], hero: { cover: ev2, post: ev3 }, looks: { cover: ev1, post: ev2 } },
  donations: { avatar: avDon, examples: [don1, don2], hero: { cover: don1, post: don2 }, looks: { cover: don2, post: don1 } },
};

/** Пропсы фото для телефона ниши: `looks` — сцена post в блоке «Как это выглядит». */
export function phonePhotos(slug: string, looks = false) {
  const p = NICHE_PHOTOS[slug];
  if (!p) return {};
  const x = looks ? p.looks : p.hero;
  return { avatar: p.avatar.src, coverImg: x.cover.src, postImg: x.post.src };
}
