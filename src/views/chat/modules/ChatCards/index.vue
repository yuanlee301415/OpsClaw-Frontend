<script setup>
import { ref } from 'vue'
import Logo from '@/layout/modules/Logo/index.vue'

defineOptions({ name: 'ChatCards' })

const activeName = ref('cj')

function handleTab(tabName) {
  activeName.value = tabName
}
</script>

<template>
  <div class="chat-cards">
    <div class="flex flex-col gap-y-4 items-center mt-10">
      <Logo />
      <h2>7x24小时，随时随地召唤的全能运维 AI 助手</h2>
    </div>

    <div class="home-dual-theme-stage mt-6 flex min-h-0 min-w-0 flex-1 flex-col items-center gap-0 overflow-y-auto pb-2 sm:mt-8 md:mt-10">
      <div class="flex w-full max-w-full min-w-0 flex-col items-stretch justify-center gap-8 px-1 pb-10 pt-1 sm:gap-9 sm:px-3 sm:pb-12">
        <div class="flex w-full shrink-0 justify-center px-1 pt-0 sm:px-2">
          <div
            class="inline-flex rounded-2xl border border-gray-200/85 bg-white/95 p-1 shadow-sm ring-1 ring-gray-100/90 gap-x-2"
            role="tablist"
            aria-label="工作台入口：场景或功能"
          >
            <button
              type="button"
              role="tab"
              aria-selected="true"
              class="min-w-[5.5rem] rounded-xl px-1.5 py-1.5 text-sm font-semibold transition sm:min-w-[6.5rem]"
              :class="[
                activeName === 'cj'
                  ? 'bg-violet-600 text-white shadow-md shadow-violet-900/15 ring-1 ring-violet-500/80'
                  : ' text-gray-600 hover:bg-slate-100/90 hover:text-slate-900',
              ]"
              @click="handleTab('cj')"
            >
              场景
            </button>
            <button
              type="button"
              role="tab"
              aria-selected="false"
              class="min-w-[5.5rem] rounded-xl px-1.5 py-1.5 text-sm font-semibold transition sm:min-w-[6.5rem]"
              :class="[
                activeName === 'gl'
                  ? 'bg-violet-600 text-white shadow-md shadow-violet-900/15 ring-1 ring-violet-500/80'
                  : ' text-gray-600 hover:bg-slate-100/90 hover:text-slate-900',
              ]"
              @click="handleTab('gl')"
            >
              功能
            </button>
          </div>
        </div>
        <div class="flex w-full min-w-0 flex-1 flex-col justify-start lg:min-w-0">
          <div
            v-show="activeName === 'cj'"
            class="feature-card-stage inline-flex max-w-full min-w-0 flex-wrap justify-start gap-2 content-start sm:gap-2.5 md:gap-3"
          >
            <article
              role="button"
              tabindex="0"
              class="feature-card group relative flex flex-col overflow-hidden border motion-safe:will-change-transform focus:outline-none focus-visible:ring-2 focus-visible:ring-violet-400/55 focus-visible:ring-offset-1 rounded-2xl flex-none min-w-[118px] w-[168px] max-w-[176px] sm:min-w-[122px] sm:w-[176px] border-white/15 bg-zinc-950 feature-card--cinematic-home feature-card--poster-layout feature-card--cine-scenario shadow-none ring-1 ring-violet-300/40 shadow-[inset_0_1px_0_rgb(255_255_255/0.12)] feature-card--interactive cursor-pointer"
              style="
                translate: none;
                rotate: none;
                scale: none;
                transform-origin: 50% 50%;
                transform: translate(0px, 0px);
                opacity: 1;
                visibility: inherit;
                box-shadow:
                  rgba(255, 255, 255, 0.5) 0px 1px 0px inset,
                  rgba(91, 33, 182, 0.18) 0px 10px 28px -6px,
                  rgba(109, 40, 217, 0.12) 0px 22px 48px -12px,
                  rgba(0, 0, 0, 0.1) 0px 4px 14px -4px;
              "
            >
              <div class="pointer-events-none absolute inset-0 z-0 overflow-hidden rounded-[inherit]" aria-hidden="true">
                <img
                  src="@/assets/cards/photo-1550751827-4bd374c3f58b.jpg"
                  alt=""
                  class="absolute inset-0 h-full w-full object-cover object-center"
                  loading="lazy"
                  decoding="async"
                  fetchpriority="low"
                  referrerpolicy="no-referrer"
                />
                <div class="feature-card-poster-base absolute inset-0 feature-card-poster--alert feature-card-poster-base--over-photo"></div>
                <div class="feature-card-cinematic-ambient absolute -left-1/4 -top-1/4 h-[150%] w-[150%]"></div>
              </div>
              <div class="feature-card-cinematic-vignette pointer-events-none absolute inset-0 z-[1] rounded-[inherit]" aria-hidden="true"></div>
              <div class="pointer-events-none absolute inset-0 z-[1] overflow-hidden rounded-[inherit]" aria-hidden="true">
                <div class="feature-card-cinematic-sweep"></div>
              </div>
              <div class="feature-card-cinematic-grain pointer-events-none absolute inset-0 z-[1] rounded-[inherit]" aria-hidden="true"></div>
              <div class="feature-card-poster-scrim pointer-events-none absolute inset-0 z-[2] rounded-[inherit]" aria-hidden="true"></div>
              <span
                class="feature-card-glow-ring pointer-events-none absolute inset-0 z-[2] rounded-[inherit] ring-1 ring-inset ring-white/20"
                aria-hidden="true"
              ></span>
              <div class="pointer-events-none absolute right-2 top-[2.35rem] z-[6] sm:top-[2.5rem]" aria-hidden="true">
                <span
                  class="feature-card-icon-wrap--poster flex h-9 w-9 items-center justify-center rounded-full bg-black/40 text-white ring-1 ring-white/25 backdrop-blur-md motion-safe:transition motion-safe:duration-300 motion-safe:ease-out group-hover:scale-110 sm:h-10 sm:w-10"
                  ><svg
                    width="22"
                    height="22"
                    viewBox="0 -960 960 960"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    aria-hidden="true"
                    class="material-symbols material-symbols_crisis_alert shrink-0 text-white [&amp;_svg]:drop-shadow-[0_2px_6px_rgb(0_0_0_/_0.45)] sm:[&amp;_svg]:scale-105"
                  >
                    <path
                      d="M480-54q-88.09 0-165.84-33.31-77.76-33.32-135.48-90.87-57.72-57.56-91.2-135.36Q54-391.35 54-479.65q0-125.5 66.8-229.95 66.81-104.44 181.85-157.27-1.82 19.39-.95 38.41.86 19.02 5.43 40.55Q223-740.65 175-657.86q-48 82.79-48 178.43 0 146.88 103.1 249.66Q333.19-127 480.14-127t249.9-102.77Q833-332.55 833-479.43q0-96.64-48.28-178.93T651.87-787.91q4.57-23.09 6.22-41.55 1.65-18.45-.18-37.41 114.48 52.83 181.29 157.39Q906-604.91 906-479.43q0 88.08-33.42 165.84-33.42 77.75-91.15 135.48-57.73 57.72-135.54 90.92Q568.09-54 480-54Zm0-170.17q-106.78 0-181.02-74.45-74.24-74.46-74.24-180.81 0-63.58 28.85-118.18 28.84-54.61 80.97-91.43 4 14.39 10.2 32.56 6.2 18.18 14.89 42.7-29.71 25.2-45.81 59.9-16.1 34.71-16.1 74.45 0 76.22 53.06 128.96 53.07 52.73 129.2 52.73t129.2-52.73q53.06-52.74 53.06-128.96 0-39.74-16.09-74.33-16.08-34.59-45.26-60.02 7.7-24.65 13.61-42.83 5.92-18.17 10.48-32.43 52.13 36.82 81.2 91.43 29.06 54.6 29.06 118.18 0 106.35-74.24 180.81-74.24 74.45-181.02 74.45Zm-12.26-408.09q-11.7 0-21.11-6.35t-12.98-17.48l-40-124.21q-6.56-24.44-8.78-41.28-2.22-16.85-2.22-35.03 0-41.01 28.3-69.46 28.3-28.45 69.09-28.45 40.79 0 69.33 28.45t28.54 69.46q0 18-2.5 34.37-2.5 16.37-8.5 41.09l-40.56 125.06q-3.38 11.2-13.19 17.51-9.82 6.32-20.9 6.32h-24.52Zm12.16 226.78q-31.16 0-52.79-21.72-21.63-21.73-21.63-52.9 0-31.16 21.72-52.79 21.73-21.63 52.9-21.63 31.16 0 52.79 21.72 21.63 21.73 21.63 52.9 0 31.16-21.72 52.79-21.73 21.63-52.9 21.63Z"
                      fill="currentColor"
                    ></path></svg
                ></span>
              </div>
              <div
                class="relative z-[5] mt-auto flex min-h-[6rem] flex-col justify-end px-2.5 pb-2.5 pt-10 text-left sm:min-h-[6.5rem] sm:px-3 sm:pb-3"
              >
                <h3
                  class="feature-card-title feature-card-title--poster line-clamp-2 min-w-0 text-left text-[13px] font-bold leading-snug sm:text-[14px]"
                  title="告警处置"
                >
                  告警处置
                </h3>
                <!---->
              </div>
              <div class="pointer-events-none absolute inset-0 z-[4] overflow-hidden rounded-[inherit]" aria-hidden="true">
                <div class="feature-card-sheen feature-card-sheen--cinematic absolute inset-0 mix-blend-overlay"></div>
              </div>
            </article>
            <article
              role="button"
              tabindex="0"
              class="feature-card group relative flex flex-col overflow-hidden border motion-safe:will-change-transform focus:outline-none focus-visible:ring-2 focus-visible:ring-violet-400/55 focus-visible:ring-offset-1 rounded-2xl flex-none min-w-[118px] w-[168px] max-w-[176px] sm:min-w-[122px] sm:w-[176px] border-white/15 bg-zinc-950 feature-card--cinematic-home feature-card--poster-layout feature-card--cine-scenario shadow-none ring-1 ring-violet-300/40 shadow-[inset_0_1px_0_rgb(255_255_255/0.12)] feature-card--interactive cursor-pointer"
              style="
                translate: none;
                rotate: none;
                scale: none;
                transform-origin: 50% 50%;
                transform: translate(0px, 0px);
                opacity: 1;
                visibility: inherit;
                box-shadow:
                  rgba(255, 255, 255, 0.5) 0px 1px 0px inset,
                  rgba(91, 33, 182, 0.18) 0px 10px 28px -6px,
                  rgba(109, 40, 217, 0.12) 0px 22px 48px -12px,
                  rgba(0, 0, 0, 0.1) 0px 4px 14px -4px;
              "
            >
              <div class="pointer-events-none absolute inset-0 z-0 overflow-hidden rounded-[inherit]" aria-hidden="true">
                <img
                  src="@/assets/cards/photo-1555949963-aa79dcee981c.jpg"
                  alt=""
                  class="absolute inset-0 h-full w-full object-cover object-center"
                  loading="lazy"
                  decoding="async"
                  fetchpriority="low"
                  referrerpolicy="no-referrer"
                />
                <div class="feature-card-poster-base absolute inset-0 feature-card-poster--log feature-card-poster-base--over-photo"></div>
                <div class="feature-card-cinematic-ambient absolute -left-1/4 -top-1/4 h-[150%] w-[150%]"></div>
              </div>
              <div class="feature-card-cinematic-vignette pointer-events-none absolute inset-0 z-[1] rounded-[inherit]" aria-hidden="true"></div>
              <div class="pointer-events-none absolute inset-0 z-[1] overflow-hidden rounded-[inherit]" aria-hidden="true">
                <div class="feature-card-cinematic-sweep"></div>
              </div>
              <div class="feature-card-cinematic-grain pointer-events-none absolute inset-0 z-[1] rounded-[inherit]" aria-hidden="true"></div>
              <div class="feature-card-poster-scrim pointer-events-none absolute inset-0 z-[2] rounded-[inherit]" aria-hidden="true"></div>
              <span
                class="feature-card-glow-ring pointer-events-none absolute inset-0 z-[2] rounded-[inherit] ring-1 ring-inset ring-white/20"
                aria-hidden="true"
              ></span>
              <div class="pointer-events-none absolute right-2 top-[2.35rem] z-[6] sm:top-[2.5rem]" aria-hidden="true">
                <span
                  class="feature-card-icon-wrap--poster flex h-9 w-9 items-center justify-center rounded-full bg-black/40 text-white ring-1 ring-white/25 backdrop-blur-md motion-safe:transition motion-safe:duration-300 motion-safe:ease-out group-hover:scale-110 sm:h-10 sm:w-10"
                  ><svg
                    width="22"
                    height="22"
                    viewBox="0 -960 960 960"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    aria-hidden="true"
                    class="material-symbols material-symbols_article shrink-0 text-white [&amp;_svg]:drop-shadow-[0_2px_6px_rgb(0_0_0_/_0.45)] sm:[&amp;_svg]:scale-105"
                  >
                    <path
                      d="M185.09-105.87q-32.51 0-55.87-23.35-23.35-23.36-23.35-55.87v-589.82q0-32.74 23.35-56.26 23.36-23.53 55.87-23.53h589.82q32.74 0 56.26 23.53 23.53 23.52 23.53 56.26v589.82q0 32.51-23.53 55.87-23.52 23.35-56.26 23.35H185.09Zm124.74-175.96h215q12.18 0 21.09-8.67 8.91-8.68 8.91-21.5 0-12.26-8.91-21.04-8.91-8.79-21.09-8.79h-215q-12.75 0-21.38 8.96-8.62 8.96-8.62 21.5t8.62 21.04q8.63 8.5 21.38 8.5Zm0-168.17h340.91q12.18 0 21.09-8.68 8.91-8.67 8.91-21.5 0-12.82-8.91-21.32t-21.09-8.5H309.83q-12.75 0-21.38 8.68-8.62 8.67-8.62 21.5 0 12.82 8.62 21.32 8.63 8.5 21.38 8.5Zm.18-168.74h340.73q12.18 0 21.09-8.67 8.91-8.68 8.91-21.5 0-12.26-8.91-21.05-8.91-8.78-21.09-8.78H310.01q-12.83 0-21.5 8.96-8.68 8.96-8.68 21.5t8.68 21.04q8.67 8.5 21.5 8.5Z"
                      fill="currentColor"
                    ></path></svg
                ></span>
              </div>
              <div
                class="relative z-[5] mt-auto flex min-h-[6rem] flex-col justify-end px-2.5 pb-2.5 pt-10 text-left sm:min-h-[6.5rem] sm:px-3 sm:pb-3"
              >
                <h3
                  class="feature-card-title feature-card-title--poster line-clamp-2 min-w-0 text-left text-[13px] font-bold leading-snug sm:text-[14px]"
                  title="故障根因"
                >
                  故障根因
                </h3>
                <!---->
              </div>
              <div class="pointer-events-none absolute inset-0 z-[4] overflow-hidden rounded-[inherit]" aria-hidden="true">
                <div class="feature-card-sheen feature-card-sheen--cinematic absolute inset-0 mix-blend-overlay"></div>
              </div>
            </article>
            <article
              role="button"
              tabindex="0"
              class="feature-card group relative flex flex-col overflow-hidden border motion-safe:will-change-transform focus:outline-none focus-visible:ring-2 focus-visible:ring-violet-400/55 focus-visible:ring-offset-1 rounded-2xl flex-none min-w-[118px] w-[168px] max-w-[176px] sm:min-w-[122px] sm:w-[176px] border-white/15 bg-zinc-950 feature-card--cinematic-home feature-card--poster-layout feature-card--cine-scenario shadow-none ring-1 ring-violet-300/40 shadow-[inset_0_1px_0_rgb(255_255_255/0.12)] feature-card--interactive cursor-pointer"
              style="
                translate: none;
                rotate: none;
                scale: none;
                transform-origin: 50% 50%;
                transform: translate(0px, 0px);
                opacity: 1;
                visibility: inherit;
                box-shadow:
                  rgba(255, 255, 255, 0.5) 0px 1px 0px inset,
                  rgba(91, 33, 182, 0.18) 0px 10px 28px -6px,
                  rgba(109, 40, 217, 0.12) 0px 22px 48px -12px,
                  rgba(0, 0, 0, 0.1) 0px 4px 14px -4px;
              "
            >
              <div class="pointer-events-none absolute inset-0 z-0 overflow-hidden rounded-[inherit]" aria-hidden="true">
                <img
                  src="@/assets/cards/photo-1551288049-bebda4e38f71.jpg"
                  alt=""
                  class="absolute inset-0 h-full w-full object-cover object-center"
                  loading="lazy"
                  decoding="async"
                  fetchpriority="low"
                  referrerpolicy="no-referrer"
                />
                <div class="feature-card-poster-base absolute inset-0 feature-card-poster--metrics feature-card-poster-base--over-photo"></div>
                <div class="feature-card-cinematic-ambient absolute -left-1/4 -top-1/4 h-[150%] w-[150%]"></div>
              </div>
              <div class="feature-card-cinematic-vignette pointer-events-none absolute inset-0 z-[1] rounded-[inherit]" aria-hidden="true"></div>
              <div class="pointer-events-none absolute inset-0 z-[1] overflow-hidden rounded-[inherit]" aria-hidden="true">
                <div class="feature-card-cinematic-sweep"></div>
              </div>
              <div class="feature-card-cinematic-grain pointer-events-none absolute inset-0 z-[1] rounded-[inherit]" aria-hidden="true"></div>
              <div class="feature-card-poster-scrim pointer-events-none absolute inset-0 z-[2] rounded-[inherit]" aria-hidden="true"></div>
              <span
                class="feature-card-glow-ring pointer-events-none absolute inset-0 z-[2] rounded-[inherit] ring-1 ring-inset ring-white/20"
                aria-hidden="true"
              ></span>
              <div class="pointer-events-none absolute right-2 top-[2.35rem] z-[6] sm:top-[2.5rem]" aria-hidden="true">
                <span
                  class="feature-card-icon-wrap--poster flex h-9 w-9 items-center justify-center rounded-full bg-black/40 text-white ring-1 ring-white/25 backdrop-blur-md motion-safe:transition motion-safe:duration-300 motion-safe:ease-out group-hover:scale-110 sm:h-10 sm:w-10"
                  ><svg
                    width="22"
                    height="22"
                    viewBox="0 -960 960 960"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    aria-hidden="true"
                    class="material-symbols material-symbols_monitoring shrink-0 text-white [&amp;_svg]:drop-shadow-[0_2px_6px_rgb(0_0_0_/_0.45)] sm:[&amp;_svg]:scale-105"
                  >
                    <path
                      d="M149.26-110.39q-16.78 0-27.83-11.17-11.04-11.17-11.04-27.77v-50.63q0-16.07 11.22-27.55Q132.83-239 149.33-239t27.54 11.45q11.04 11.45 11.04 27.81v50.65q0 16.36-11.25 27.53-11.26 11.17-27.4 11.17Zm165 0q-16.47 0-27.39-11.2-10.91-11.21-10.91-27.84v-194.13q0-16.4 11.15-27.44 11.16-11.04 27.72-11.04T342.44-371q11.04 11.04 11.04 27.44v194.13q0 16.63-11.26 27.84-11.25 11.2-27.96 11.2Zm166.08 0q-16.17 0-27.49-11.17-11.33-11.17-11.33-27.87v-134.13q0-16.08 11.55-27.56 11.55-11.49 27.72-11.49 16.17 0 27.21 11.49 11.04 11.48 11.04 27.56v134.69q0 16.07-11.26 27.28-11.27 11.2-27.44 11.2Zm165.62 0q-16.79 0-27.83-11.17t-11.04-27.87v-244.31q0-16.14 11.22-27.31 11.21-11.17 27.71-11.17t27.55 11.17q11.04 11.17 11.04 27.31v244.87q0 16.07-11.26 27.28-11.25 11.2-27.39 11.2Zm164.95 0q-16.17 0-27.21-11.17-11.05-11.17-11.05-27.87v-364.31q0-16.14 11.22-27.31 11.22-11.17 27.39-11.17 16.16 0 27.26 11.17 11.09 11.17 11.09 27.31v364.87q0 16.07-11.27 27.28-11.27 11.2-27.43 11.2ZM559.78-496.17q-15.17 0-29.74-6.09-14.57-6.08-26.61-17.57L400-623.26 179.35-403.61q-11.89 11.83-28.68 11.37-16.79-.45-28.08-12.32-11.2-11.87-11.7-27.83-.5-15.96 11.33-27.78l222.21-220.22q11.88-11.94 26.24-17.58 14.37-5.64 29.33-5.64 14.96 0 29.66 5.64 14.69 5.64 25.91 17.58L560-575.96l221.65-221.65q11.83-11.83 28.15-11.87 16.32-.05 27.61 11.83 11.2 11.87 11.7 27.82.5 15.96-11.33 27.79L615.57-519.83q-10.9 11.88-25.76 17.77-14.85 5.89-30.03 5.89Z"
                      fill="currentColor"
                    ></path></svg
                ></span>
              </div>
              <div
                class="relative z-[5] mt-auto flex min-h-[6rem] flex-col justify-end px-2.5 pb-2.5 pt-10 text-left sm:min-h-[6.5rem] sm:px-3 sm:pb-3"
              >
                <h3
                  class="feature-card-title feature-card-title--poster line-clamp-2 min-w-0 text-left text-[13px] font-bold leading-snug sm:text-[14px]"
                  title="智能问数"
                >
                  智能问数
                </h3>
                <!---->
              </div>
              <div class="pointer-events-none absolute inset-0 z-[4] overflow-hidden rounded-[inherit]" aria-hidden="true">
                <div class="feature-card-sheen feature-card-sheen--cinematic absolute inset-0 mix-blend-overlay"></div>
              </div>
            </article>
            <article
              role="button"
              tabindex="0"
              class="feature-card group relative flex flex-col overflow-hidden border motion-safe:will-change-transform focus:outline-none focus-visible:ring-2 focus-visible:ring-violet-400/55 focus-visible:ring-offset-1 rounded-2xl flex-none min-w-[118px] w-[168px] max-w-[176px] sm:min-w-[122px] sm:w-[176px] border-white/15 bg-zinc-950 feature-card--cinematic-home feature-card--poster-layout feature-card--cine-scenario shadow-none ring-1 ring-violet-300/40 shadow-[inset_0_1px_0_rgb(255_255_255/0.12)] feature-card--interactive cursor-pointer"
              style="
                translate: none;
                rotate: none;
                scale: none;
                transform-origin: 50% 50%;
                transform: translate(0px, 0px);
                opacity: 1;
                visibility: inherit;
                box-shadow:
                  rgba(255, 255, 255, 0.5) 0px 1px 0px inset,
                  rgba(91, 33, 182, 0.18) 0px 10px 28px -6px,
                  rgba(109, 40, 217, 0.12) 0px 22px 48px -12px,
                  rgba(0, 0, 0, 0.1) 0px 4px 14px -4px;
              "
            >
              <div class="pointer-events-none absolute inset-0 z-0 overflow-hidden rounded-[inherit]" aria-hidden="true">
                <img
                  src="@/assets/cards/photo-1503387762-592deb58ef4e.jpg"
                  alt=""
                  class="absolute inset-0 h-full w-full object-cover object-center"
                  loading="lazy"
                  decoding="async"
                  fetchpriority="low"
                  referrerpolicy="no-referrer"
                />
                <div class="feature-card-poster-base absolute inset-0 feature-card-poster--patrol feature-card-poster-base--over-photo"></div>
                <div class="feature-card-cinematic-ambient absolute -left-1/4 -top-1/4 h-[150%] w-[150%]"></div>
              </div>
              <div class="feature-card-cinematic-vignette pointer-events-none absolute inset-0 z-[1] rounded-[inherit]" aria-hidden="true"></div>
              <div class="pointer-events-none absolute inset-0 z-[1] overflow-hidden rounded-[inherit]" aria-hidden="true">
                <div class="feature-card-cinematic-sweep"></div>
              </div>
              <div class="feature-card-cinematic-grain pointer-events-none absolute inset-0 z-[1] rounded-[inherit]" aria-hidden="true"></div>
              <div class="feature-card-poster-scrim pointer-events-none absolute inset-0 z-[2] rounded-[inherit]" aria-hidden="true"></div>
              <span
                class="feature-card-glow-ring pointer-events-none absolute inset-0 z-[2] rounded-[inherit] ring-1 ring-inset ring-white/20"
                aria-hidden="true"
              ></span>
              <div class="pointer-events-none absolute right-2 top-[2.35rem] z-[6] sm:top-[2.5rem]" aria-hidden="true">
                <span
                  class="feature-card-icon-wrap--poster flex h-9 w-9 items-center justify-center rounded-full bg-black/40 text-white ring-1 ring-white/25 backdrop-blur-md motion-safe:transition motion-safe:duration-300 motion-safe:ease-out group-hover:scale-110 sm:h-10 sm:w-10"
                  ><svg
                    width="22"
                    height="22"
                    viewBox="0 -960 960 960"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    aria-hidden="true"
                    class="material-symbols material-symbols_fact_check shrink-0 text-white [&amp;_svg]:drop-shadow-[0_2px_6px_rgb(0_0_0_/_0.45)] sm:[&amp;_svg]:scale-105"
                  >
                    <path
                      d="M137.09-105.87q-32.51 0-55.87-23.35-23.35-23.36-23.35-55.87v-589.82q0-32.74 23.35-56.26 23.36-23.53 55.87-23.53h685.82q32.74 0 56.26 23.53 23.53 23.52 23.53 56.26v589.82q0 32.51-23.53 55.87-23.52 23.35-56.26 23.35H137.09ZM372.44-280q16.43 0 28.21-11.5 11.79-11.5 11.79-28.5t-11.79-28.5Q388.87-360 372.44-360H255.83q-17 0-28.5 11.5t-11.5 28.5q0 17 11.5 28.5t28.5 11.5h116.61Zm209.84-193-29.2-29Q541-514 525-513.5q-16 .5-28 12.5-11 12-11.5 28t11.5 28l56.65 56.65q12.24 11.83 28.56 11.83 16.31 0 28.14-11.83l138.26-138.26q12-12 12-28t-12-28q-12-12-28.5-12t-28.58 12.16L582.28-473Zm-209.84 33q16.43 0 28.21-11.5 11.79-11.5 11.79-28.5t-11.79-28.5Q388.87-520 372.44-520H255.83q-17 0-28.5 11.5t-11.5 28.5q0 17 11.5 28.5t28.5 11.5h116.61Zm0-160q16.43 0 28.21-11.5 11.79-11.5 11.79-28.5t-11.79-28.5Q388.87-680 372.44-680H255.83q-17 0-28.5 11.5t-11.5 28.5q0 17 11.5 28.5t28.5 11.5h116.61Z"
                      fill="currentColor"
                    ></path></svg
                ></span>
              </div>
              <div
                class="relative z-[5] mt-auto flex min-h-[6rem] flex-col justify-end px-2.5 pb-2.5 pt-10 text-left sm:min-h-[6.5rem] sm:px-3 sm:pb-3"
              >
                <h3
                  class="feature-card-title feature-card-title--poster line-clamp-2 min-w-0 text-left text-[13px] font-bold leading-snug sm:text-[14px]"
                  title="巡检管理"
                >
                  巡检管理
                </h3>
                <!---->
              </div>
              <div class="pointer-events-none absolute inset-0 z-[4] overflow-hidden rounded-[inherit]" aria-hidden="true">
                <div class="feature-card-sheen feature-card-sheen--cinematic absolute inset-0 mix-blend-overlay"></div>
              </div>
            </article>
          </div>

          <div
            v-show="activeName === 'gl'"
            class="feature-card-stage inline-flex max-w-full min-w-0 flex-wrap justify-start gap-2 content-start sm:gap-2.5 md:gap-3"
          >
            <article
              role="button"
              tabindex="0"
              class="feature-card group relative flex flex-col overflow-hidden border motion-safe:will-change-transform focus:outline-none focus-visible:ring-2 focus-visible:ring-violet-400/55 focus-visible:ring-offset-1 rounded-2xl flex-none min-w-[118px] w-[168px] max-w-[176px] sm:min-w-[122px] sm:w-[176px] border-white/15 bg-zinc-950 feature-card--cinematic-home feature-card--poster-layout feature-card--cine-function shadow-none ring-1 ring-slate-300/40 shadow-[inset_0_1px_0_rgb(255_255_255/0.1)] feature-card--interactive cursor-pointer"
              style="
                translate: none;
                rotate: none;
                scale: none;
                transform-origin: 50% 50%;
                transform: translate(0px, 0px);
                opacity: 1;
                visibility: inherit;
                box-shadow:
                  rgba(255, 255, 255, 0.45) 0px 1px 0px inset,
                  rgba(51, 65, 85, 0.16) 0px 10px 28px -6px,
                  rgba(30, 41, 59, 0.1) 0px 22px 48px -12px,
                  rgba(0, 0, 0, 0.09) 0px 4px 14px -4px;
              "
            >
              <div class="pointer-events-none absolute inset-0 z-0 overflow-hidden rounded-[inherit]" aria-hidden="true">
                <img
                  src="@/assets/cards/photo-1510511459019-5dda7724fd87.jpg"
                  alt=""
                  class="absolute inset-0 h-full w-full object-cover object-center"
                  loading="lazy"
                  decoding="async"
                  fetchpriority="low"
                  referrerpolicy="no-referrer"
                />
                <div class="feature-card-poster-base absolute inset-0 feature-card-poster--alert feature-card-poster-base--over-photo"></div>
                <div class="feature-card-cinematic-ambient absolute -left-1/4 -top-1/4 h-[150%] w-[150%]"></div>
              </div>
              <div class="feature-card-cinematic-vignette pointer-events-none absolute inset-0 z-[1] rounded-[inherit]" aria-hidden="true"></div>
              <div class="pointer-events-none absolute inset-0 z-[1] overflow-hidden rounded-[inherit]" aria-hidden="true">
                <div class="feature-card-cinematic-sweep"></div>
              </div>
              <div class="feature-card-cinematic-grain pointer-events-none absolute inset-0 z-[1] rounded-[inherit]" aria-hidden="true"></div>
              <div class="feature-card-poster-scrim pointer-events-none absolute inset-0 z-[2] rounded-[inherit]" aria-hidden="true"></div>
              <span
                class="feature-card-glow-ring pointer-events-none absolute inset-0 z-[2] rounded-[inherit] ring-1 ring-inset ring-white/20"
                aria-hidden="true"
              ></span>
              <div class="pointer-events-none absolute right-2 top-[2.35rem] z-[6] sm:top-[2.5rem]" aria-hidden="true">
                <span
                  class="feature-card-icon-wrap--poster flex h-9 w-9 items-center justify-center rounded-full bg-black/40 text-white ring-1 ring-white/25 backdrop-blur-md motion-safe:transition motion-safe:duration-300 motion-safe:ease-out group-hover:scale-110 sm:h-10 sm:w-10"
                  ><svg
                    width="22"
                    height="22"
                    viewBox="0 -960 960 960"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    aria-hidden="true"
                    class="material-symbols material-symbols_crisis_alert shrink-0 text-white [&amp;_svg]:drop-shadow-[0_2px_6px_rgb(0_0_0_/_0.45)] sm:[&amp;_svg]:scale-105"
                  >
                    <path
                      d="M480-54q-88.09 0-165.84-33.31-77.76-33.32-135.48-90.87-57.72-57.56-91.2-135.36Q54-391.35 54-479.65q0-125.5 66.8-229.95 66.81-104.44 181.85-157.27-1.82 19.39-.95 38.41.86 19.02 5.43 40.55Q223-740.65 175-657.86q-48 82.79-48 178.43 0 146.88 103.1 249.66Q333.19-127 480.14-127t249.9-102.77Q833-332.55 833-479.43q0-96.64-48.28-178.93T651.87-787.91q4.57-23.09 6.22-41.55 1.65-18.45-.18-37.41 114.48 52.83 181.29 157.39Q906-604.91 906-479.43q0 88.08-33.42 165.84-33.42 77.75-91.15 135.48-57.73 57.72-135.54 90.92Q568.09-54 480-54Zm0-170.17q-106.78 0-181.02-74.45-74.24-74.46-74.24-180.81 0-63.58 28.85-118.18 28.84-54.61 80.97-91.43 4 14.39 10.2 32.56 6.2 18.18 14.89 42.7-29.71 25.2-45.81 59.9-16.1 34.71-16.1 74.45 0 76.22 53.06 128.96 53.07 52.73 129.2 52.73t129.2-52.73q53.06-52.74 53.06-128.96 0-39.74-16.09-74.33-16.08-34.59-45.26-60.02 7.7-24.65 13.61-42.83 5.92-18.17 10.48-32.43 52.13 36.82 81.2 91.43 29.06 54.6 29.06 118.18 0 106.35-74.24 180.81-74.24 74.45-181.02 74.45Zm-12.26-408.09q-11.7 0-21.11-6.35t-12.98-17.48l-40-124.21q-6.56-24.44-8.78-41.28-2.22-16.85-2.22-35.03 0-41.01 28.3-69.46 28.3-28.45 69.09-28.45 40.79 0 69.33 28.45t28.54 69.46q0 18-2.5 34.37-2.5 16.37-8.5 41.09l-40.56 125.06q-3.38 11.2-13.19 17.51-9.82 6.32-20.9 6.32h-24.52Zm12.16 226.78q-31.16 0-52.79-21.72-21.63-21.73-21.63-52.9 0-31.16 21.72-52.79 21.73-21.63 52.9-21.63 31.16 0 52.79 21.72 21.63 21.73 21.63 52.9 0 31.16-21.72 52.79-21.73 21.63-52.9 21.63Z"
                      fill="currentColor"
                    ></path></svg
                ></span>
              </div>
              <div
                class="relative z-[5] mt-auto flex min-h-[6rem] flex-col justify-end px-2.5 pb-2.5 pt-10 text-left sm:min-h-[6.5rem] sm:px-3 sm:pb-3"
              >
                <h3
                  class="feature-card-title feature-card-title--poster line-clamp-2 min-w-0 text-left text-[13px] font-bold leading-snug sm:text-[14px]"
                  title="告警管理"
                >
                  告警管理
                </h3>
                <!---->
              </div>
              <div class="pointer-events-none absolute inset-0 z-[4] overflow-hidden rounded-[inherit]" aria-hidden="true">
                <div class="feature-card-sheen feature-card-sheen--cinematic absolute inset-0 mix-blend-overlay"></div>
              </div>
            </article>
            <article
              role="button"
              tabindex="0"
              class="feature-card group relative flex flex-col overflow-hidden border motion-safe:will-change-transform focus:outline-none focus-visible:ring-2 focus-visible:ring-violet-400/55 focus-visible:ring-offset-1 rounded-2xl flex-none min-w-[118px] w-[168px] max-w-[176px] sm:min-w-[122px] sm:w-[176px] border-white/15 bg-zinc-950 feature-card--cinematic-home feature-card--poster-layout feature-card--cine-function shadow-none ring-1 ring-slate-300/40 shadow-[inset_0_1px_0_rgb(255_255_255/0.1)] feature-card--interactive cursor-pointer"
              style="
                translate: none;
                rotate: none;
                scale: none;
                transform-origin: 50% 50%;
                transform: translate(0px, 0px);
                opacity: 1;
                visibility: inherit;
                box-shadow:
                  rgba(255, 255, 255, 0.45) 0px 1px 0px inset,
                  rgba(51, 65, 85, 0.16) 0px 10px 28px -6px,
                  rgba(30, 41, 59, 0.1) 0px 22px 48px -12px,
                  rgba(0, 0, 0, 0.09) 0px 4px 14px -4px;
              "
            >
              <div class="pointer-events-none absolute inset-0 z-0 overflow-hidden rounded-[inherit]" aria-hidden="true">
                <img
                  src="@/assets/cards/photo-1460925895917-afdab827c52f.jpg"
                  alt=""
                  class="absolute inset-0 h-full w-full object-cover object-center"
                  loading="lazy"
                  decoding="async"
                  fetchpriority="low"
                  referrerpolicy="no-referrer"
                />
                <div class="feature-card-poster-base absolute inset-0 feature-card-poster--metrics feature-card-poster-base--over-photo"></div>
                <div class="feature-card-cinematic-ambient absolute -left-1/4 -top-1/4 h-[150%] w-[150%]"></div>
              </div>
              <div class="feature-card-cinematic-vignette pointer-events-none absolute inset-0 z-[1] rounded-[inherit]" aria-hidden="true"></div>
              <div class="pointer-events-none absolute inset-0 z-[1] overflow-hidden rounded-[inherit]" aria-hidden="true">
                <div class="feature-card-cinematic-sweep"></div>
              </div>
              <div class="feature-card-cinematic-grain pointer-events-none absolute inset-0 z-[1] rounded-[inherit]" aria-hidden="true"></div>
              <div class="feature-card-poster-scrim pointer-events-none absolute inset-0 z-[2] rounded-[inherit]" aria-hidden="true"></div>
              <span
                class="feature-card-glow-ring pointer-events-none absolute inset-0 z-[2] rounded-[inherit] ring-1 ring-inset ring-white/20"
                aria-hidden="true"
              ></span>
              <div class="pointer-events-none absolute right-2 top-[2.35rem] z-[6] sm:top-[2.5rem]" aria-hidden="true">
                <span
                  class="feature-card-icon-wrap--poster flex h-9 w-9 items-center justify-center rounded-full bg-black/40 text-white ring-1 ring-white/25 backdrop-blur-md motion-safe:transition motion-safe:duration-300 motion-safe:ease-out group-hover:scale-110 sm:h-10 sm:w-10"
                  ><svg
                    width="22"
                    height="22"
                    viewBox="0 -960 960 960"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    aria-hidden="true"
                    class="material-symbols material-symbols_monitoring shrink-0 text-white [&amp;_svg]:drop-shadow-[0_2px_6px_rgb(0_0_0_/_0.45)] sm:[&amp;_svg]:scale-105"
                  >
                    <path
                      d="M149.26-110.39q-16.78 0-27.83-11.17-11.04-11.17-11.04-27.77v-50.63q0-16.07 11.22-27.55Q132.83-239 149.33-239t27.54 11.45q11.04 11.45 11.04 27.81v50.65q0 16.36-11.25 27.53-11.26 11.17-27.4 11.17Zm165 0q-16.47 0-27.39-11.2-10.91-11.21-10.91-27.84v-194.13q0-16.4 11.15-27.44 11.16-11.04 27.72-11.04T342.44-371q11.04 11.04 11.04 27.44v194.13q0 16.63-11.26 27.84-11.25 11.2-27.96 11.2Zm166.08 0q-16.17 0-27.49-11.17-11.33-11.17-11.33-27.87v-134.13q0-16.08 11.55-27.56 11.55-11.49 27.72-11.49 16.17 0 27.21 11.49 11.04 11.48 11.04 27.56v134.69q0 16.07-11.26 27.28-11.27 11.2-27.44 11.2Zm165.62 0q-16.79 0-27.83-11.17t-11.04-27.87v-244.31q0-16.14 11.22-27.31 11.21-11.17 27.71-11.17t27.55 11.17q11.04 11.17 11.04 27.31v244.87q0 16.07-11.26 27.28-11.25 11.2-27.39 11.2Zm164.95 0q-16.17 0-27.21-11.17-11.05-11.17-11.05-27.87v-364.31q0-16.14 11.22-27.31 11.22-11.17 27.39-11.17 16.16 0 27.26 11.17 11.09 11.17 11.09 27.31v364.87q0 16.07-11.27 27.28-11.27 11.2-27.43 11.2ZM559.78-496.17q-15.17 0-29.74-6.09-14.57-6.08-26.61-17.57L400-623.26 179.35-403.61q-11.89 11.83-28.68 11.37-16.79-.45-28.08-12.32-11.2-11.87-11.7-27.83-.5-15.96 11.33-27.78l222.21-220.22q11.88-11.94 26.24-17.58 14.37-5.64 29.33-5.64 14.96 0 29.66 5.64 14.69 5.64 25.91 17.58L560-575.96l221.65-221.65q11.83-11.83 28.15-11.87 16.32-.05 27.61 11.83 11.2 11.87 11.7 27.82.5 15.96-11.33 27.79L615.57-519.83q-10.9 11.88-25.76 17.77-14.85 5.89-30.03 5.89Z"
                      fill="currentColor"
                    ></path></svg
                ></span>
              </div>
              <div
                class="relative z-[5] mt-auto flex min-h-[6rem] flex-col justify-end px-2.5 pb-2.5 pt-10 text-left sm:min-h-[6.5rem] sm:px-3 sm:pb-3"
              >
                <h3
                  class="feature-card-title feature-card-title--poster line-clamp-2 min-w-0 text-left text-[13px] font-bold leading-snug sm:text-[14px]"
                  title="指标管理"
                >
                  指标管理
                </h3>
                <!---->
              </div>
              <div class="pointer-events-none absolute inset-0 z-[4] overflow-hidden rounded-[inherit]" aria-hidden="true">
                <div class="feature-card-sheen feature-card-sheen--cinematic absolute inset-0 mix-blend-overlay"></div>
              </div>
            </article>
            <article
              role="button"
              tabindex="0"
              class="feature-card group relative flex flex-col overflow-hidden border motion-safe:will-change-transform focus:outline-none focus-visible:ring-2 focus-visible:ring-violet-400/55 focus-visible:ring-offset-1 rounded-2xl flex-none min-w-[118px] w-[168px] max-w-[176px] sm:min-w-[122px] sm:w-[176px] border-white/15 bg-zinc-950 feature-card--cinematic-home feature-card--poster-layout feature-card--cine-function shadow-none ring-1 ring-slate-300/40 shadow-[inset_0_1px_0_rgb(255_255_255/0.1)] feature-card--interactive cursor-pointer"
              style="
                translate: none;
                rotate: none;
                scale: none;
                transform-origin: 50% 50%;
                transform: translate(0px, 0px);
                opacity: 1;
                visibility: inherit;
                box-shadow:
                  rgba(255, 255, 255, 0.45) 0px 1px 0px inset,
                  rgba(51, 65, 85, 0.16) 0px 10px 28px -6px,
                  rgba(30, 41, 59, 0.1) 0px 22px 48px -12px,
                  rgba(0, 0, 0, 0.09) 0px 4px 14px -4px;
              "
            >
              <div class="pointer-events-none absolute inset-0 z-0 overflow-hidden rounded-[inherit]" aria-hidden="true">
                <img
                  src="@/assets/cards/photo-1553877522-43269d4ea984.jpg"
                  alt=""
                  class="absolute inset-0 h-full w-full object-cover object-center"
                  loading="lazy"
                  decoding="async"
                  fetchpriority="low"
                  referrerpolicy="no-referrer"
                />
                <div class="feature-card-poster-base absolute inset-0 feature-card-poster--report feature-card-poster-base--over-photo"></div>
                <div class="feature-card-cinematic-ambient absolute -left-1/4 -top-1/4 h-[150%] w-[150%]"></div>
              </div>
              <div class="feature-card-cinematic-vignette pointer-events-none absolute inset-0 z-[1] rounded-[inherit]" aria-hidden="true"></div>
              <div class="pointer-events-none absolute inset-0 z-[1] overflow-hidden rounded-[inherit]" aria-hidden="true">
                <div class="feature-card-cinematic-sweep"></div>
              </div>
              <div class="feature-card-cinematic-grain pointer-events-none absolute inset-0 z-[1] rounded-[inherit]" aria-hidden="true"></div>
              <div class="feature-card-poster-scrim pointer-events-none absolute inset-0 z-[2] rounded-[inherit]" aria-hidden="true"></div>
              <span
                class="feature-card-glow-ring pointer-events-none absolute inset-0 z-[2] rounded-[inherit] ring-1 ring-inset ring-white/20"
                aria-hidden="true"
              ></span>
              <div class="pointer-events-none absolute right-2 top-[2.35rem] z-[6] sm:top-[2.5rem]" aria-hidden="true">
                <span
                  class="feature-card-icon-wrap--poster flex h-9 w-9 items-center justify-center rounded-full bg-black/40 text-white ring-1 ring-white/25 backdrop-blur-md motion-safe:transition motion-safe:duration-300 motion-safe:ease-out group-hover:scale-110 sm:h-10 sm:w-10"
                  ><svg
                    width="22"
                    height="22"
                    viewBox="0 -960 960 960"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    aria-hidden="true"
                    class="material-symbols material-symbols_analytics shrink-0 text-white [&amp;_svg]:drop-shadow-[0_2px_6px_rgb(0_0_0_/_0.45)] sm:[&amp;_svg]:scale-105"
                  >
                    <path
                      d="M316.37-482q-12.54 0-21.04 8.62-8.5 8.63-8.5 21.38v145q0 12.75 8.67 21.37 8.68 8.63 21.22 8.63t21.32-8.63q8.79-8.62 8.79-21.37v-145q0-12.75-8.96-21.38-8.96-8.62-21.5-8.62Zm326.91-215q-12.54 0-21.04 8.62-8.5 8.63-8.5 21.38v360q0 12.75 8.67 21.37 8.68 8.63 21.22 8.63t21.33-8.63q8.78-8.62 8.78-21.37v-360q0-12.75-8.96-21.38-8.96-8.62-21.5-8.62ZM479.82-395q-12.82 0-21.32 8.62-8.5 8.63-8.5 21.38v58q0 12.75 8.68 21.37 8.67 8.63 21.5 8.63 12.82 0 21.32-8.63 8.5-8.62 8.5-21.37v-58q0-12.75-8.68-21.38-8.67-8.62-21.5-8.62ZM185.09-105.87q-32.51 0-55.87-23.35-23.35-23.36-23.35-55.87v-589.82q0-32.74 23.35-56.26 23.36-23.53 55.87-23.53h589.82q32.74 0 56.26 23.53 23.53 23.52 23.53 56.26v589.82q0 32.51-23.53 55.87-23.52 23.35-56.26 23.35H185.09ZM480.18-482q12.82 0 21.32-8.68 8.5-8.67 8.5-21.5 0-12.82-8.68-21.32-8.67-8.5-21.5-8.5-12.82 0-21.32 8.68-8.5 8.67-8.5 21.5 0 12.82 8.68 21.32 8.67 8.5 21.5 8.5Z"
                      fill="currentColor"
                    ></path></svg
                ></span>
              </div>
              <div
                class="relative z-[5] mt-auto flex min-h-[6rem] flex-col justify-end px-2.5 pb-2.5 pt-10 text-left sm:min-h-[6.5rem] sm:px-3 sm:pb-3"
              >
                <h3
                  class="feature-card-title feature-card-title--poster line-clamp-2 min-w-0 text-left text-[13px] font-bold leading-snug sm:text-[14px]"
                  title="报表管理"
                >
                  报表管理
                </h3>
                <!---->
              </div>
              <div class="pointer-events-none absolute inset-0 z-[4] overflow-hidden rounded-[inherit]" aria-hidden="true">
                <div class="feature-card-sheen feature-card-sheen--cinematic absolute inset-0 mix-blend-overlay"></div>
              </div>
            </article>
            <article
              role="button"
              tabindex="0"
              class="feature-card group relative flex flex-col overflow-hidden border motion-safe:will-change-transform focus:outline-none focus-visible:ring-2 focus-visible:ring-violet-400/55 focus-visible:ring-offset-1 rounded-2xl flex-none min-w-[118px] w-[168px] max-w-[176px] sm:min-w-[122px] sm:w-[176px] border-white/15 bg-zinc-950 feature-card--cinematic-home feature-card--poster-layout feature-card--cine-function shadow-none ring-1 ring-slate-300/40 shadow-[inset_0_1px_0_rgb(255_255_255/0.1)] feature-card--interactive cursor-pointer"
              style="
                translate: none;
                rotate: none;
                scale: none;
                transform-origin: 50% 50%;
                transform: translate(0px, 0px);
                opacity: 1;
                visibility: inherit;
                box-shadow:
                  rgba(255, 255, 255, 0.45) 0px 1px 0px inset,
                  rgba(51, 65, 85, 0.16) 0px 10px 28px -6px,
                  rgba(30, 41, 59, 0.1) 0px 22px 48px -12px,
                  rgba(0, 0, 0, 0.09) 0px 4px 14px -4px;
              "
            >
              <div class="pointer-events-none absolute inset-0 z-0 overflow-hidden rounded-[inherit]" aria-hidden="true">
                <img
                  src="@/assets/cards/photo-1586528116311-ad8dd3c8310d.jpg"
                  alt=""
                  class="absolute inset-0 h-full w-full object-cover object-center"
                  loading="lazy"
                  decoding="async"
                  fetchpriority="low"
                  referrerpolicy="no-referrer"
                />
                <div class="feature-card-poster-base absolute inset-0 feature-card-poster--asset feature-card-poster-base--over-photo"></div>
                <div class="feature-card-cinematic-ambient absolute -left-1/4 -top-1/4 h-[150%] w-[150%]"></div>
              </div>
              <div class="feature-card-cinematic-vignette pointer-events-none absolute inset-0 z-[1] rounded-[inherit]" aria-hidden="true"></div>
              <div class="pointer-events-none absolute inset-0 z-[1] overflow-hidden rounded-[inherit]" aria-hidden="true">
                <div class="feature-card-cinematic-sweep"></div>
              </div>
              <div class="feature-card-cinematic-grain pointer-events-none absolute inset-0 z-[1] rounded-[inherit]" aria-hidden="true"></div>
              <div class="feature-card-poster-scrim pointer-events-none absolute inset-0 z-[2] rounded-[inherit]" aria-hidden="true"></div>
              <span
                class="feature-card-glow-ring pointer-events-none absolute inset-0 z-[2] rounded-[inherit] ring-1 ring-inset ring-white/20"
                aria-hidden="true"
              ></span>
              <div class="pointer-events-none absolute right-2 top-[2.35rem] z-[6] sm:top-[2.5rem]" aria-hidden="true">
                <span
                  class="feature-card-icon-wrap--poster flex h-9 w-9 items-center justify-center rounded-full bg-black/40 text-white ring-1 ring-white/25 backdrop-blur-md motion-safe:transition motion-safe:duration-300 motion-safe:ease-out group-hover:scale-110 sm:h-10 sm:w-10"
                  ><svg
                    width="22"
                    height="22"
                    viewBox="0 -960 960 960"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    aria-hidden="true"
                    class="material-symbols material-symbols_inventory shrink-0 text-white [&amp;_svg]:drop-shadow-[0_2px_6px_rgb(0_0_0_/_0.45)] sm:[&amp;_svg]:scale-105"
                  >
                    <path
                      d="m620-260.26 207.26-207.26q11.26-11.26 26.65-10.76 15.39.5 27.22 11.76 11.26 11.82 10.98 27.43-.28 15.61-11.54 27.44L648.35-179.43q-12.03 12.39-28.45 12.39t-28.25-12.39L480.43-290.65q-11.82-11.83-11.32-27.44.5-15.61 12.32-27.43 11.27-11.26 27.16-11.26t27.71 11.26l83.7 85.26ZM185.09-105.87q-33.9 0-56.56-22.38-22.66-22.37-22.66-56.84v-589.82q0-34.47 22.38-57.13 22.37-22.66 56.84-22.66h186.17q9.26-35.56 39.46-58.63 30.2-23.06 69.28-23.06 38.26 0 68.59 23.06 30.32 23.07 40.71 58.63h185.61q34.47 0 57.13 22.66 22.66 22.66 22.66 57.13v162.3q0 16.71-11.79 28.16Q831.13-573 814.35-573t-28.11-11.45q-11.33-11.45-11.33-28.16v-162.3h-57.17v57.17q0 16.71-11.45 28.16t-28.16 11.45H281.87q-16.71 0-28.16-11.45t-11.45-28.16v-57.17h-57.17v589.82h206.3q16.71 0 28.16 11.5Q431-162.08 431-145.3t-11.45 28.1q-11.45 11.33-28.16 11.33h-206.3ZM480-781.13q17 0 28.5-11.78Q520-804.7 520-821.13q0-17-11.5-28.5t-28.5-11.5q-17 0-28.5 11.5t-11.5 28.5q0 16.43 11.5 28.22 11.5 11.78 28.5 11.78Z"
                      fill="currentColor"
                    ></path></svg
                ></span>
              </div>
              <div
                class="relative z-[5] mt-auto flex min-h-[6rem] flex-col justify-end px-2.5 pb-2.5 pt-10 text-left sm:min-h-[6.5rem] sm:px-3 sm:pb-3"
              >
                <h3
                  class="feature-card-title feature-card-title--poster line-clamp-2 min-w-0 text-left text-[13px] font-bold leading-snug sm:text-[14px]"
                  title="资产管理"
                >
                  资产管理
                </h3>
                <!---->
              </div>
              <div class="pointer-events-none absolute inset-0 z-[4] overflow-hidden rounded-[inherit]" aria-hidden="true">
                <div class="feature-card-sheen feature-card-sheen--cinematic absolute inset-0 mix-blend-overlay"></div>
              </div>
            </article>
            <article
              role="button"
              tabindex="0"
              class="feature-card group relative flex flex-col overflow-hidden border motion-safe:will-change-transform focus:outline-none focus-visible:ring-2 focus-visible:ring-violet-400/55 focus-visible:ring-offset-1 rounded-2xl flex-none min-w-[118px] w-[168px] max-w-[176px] sm:min-w-[122px] sm:w-[176px] border-white/15 bg-zinc-950 feature-card--cinematic-home feature-card--poster-layout feature-card--cine-function shadow-none ring-1 ring-slate-300/40 shadow-[inset_0_1px_0_rgb(255_255_255/0.1)] feature-card--interactive cursor-pointer"
              style="
                translate: none;
                rotate: none;
                scale: none;
                transform-origin: 50% 50%;
                transform: translate(0px, 0px);
                opacity: 1;
                visibility: inherit;
                box-shadow:
                  rgba(255, 255, 255, 0.45) 0px 1px 0px inset,
                  rgba(51, 65, 85, 0.16) 0px 10px 28px -6px,
                  rgba(30, 41, 59, 0.1) 0px 22px 48px -12px,
                  rgba(0, 0, 0, 0.09) 0px 4px 14px -4px;
              "
            >
              <div class="pointer-events-none absolute inset-0 z-0 overflow-hidden rounded-[inherit]" aria-hidden="true">
                <img
                  src="@/assets/cards/photo-1451187580459-43490279c0fa.jpg"
                  alt=""
                  class="absolute inset-0 h-full w-full object-cover object-center"
                  loading="lazy"
                  decoding="async"
                  fetchpriority="low"
                  referrerpolicy="no-referrer"
                />
                <div class="feature-card-poster-base absolute inset-0 feature-card-poster--topology feature-card-poster-base--over-photo"></div>
                <div class="feature-card-cinematic-ambient absolute -left-1/4 -top-1/4 h-[150%] w-[150%]"></div>
              </div>
              <div class="feature-card-cinematic-vignette pointer-events-none absolute inset-0 z-[1] rounded-[inherit]" aria-hidden="true"></div>
              <div class="pointer-events-none absolute inset-0 z-[1] overflow-hidden rounded-[inherit]" aria-hidden="true">
                <div class="feature-card-cinematic-sweep"></div>
              </div>
              <div class="feature-card-cinematic-grain pointer-events-none absolute inset-0 z-[1] rounded-[inherit]" aria-hidden="true"></div>
              <div class="feature-card-poster-scrim pointer-events-none absolute inset-0 z-[2] rounded-[inherit]" aria-hidden="true"></div>
              <span
                class="feature-card-glow-ring pointer-events-none absolute inset-0 z-[2] rounded-[inherit] ring-1 ring-inset ring-white/20"
                aria-hidden="true"
              ></span>
              <div class="pointer-events-none absolute right-2 top-[2.35rem] z-[6] sm:top-[2.5rem]" aria-hidden="true">
                <span
                  class="feature-card-icon-wrap--poster flex h-9 w-9 items-center justify-center rounded-full bg-black/40 text-white ring-1 ring-white/25 backdrop-blur-md motion-safe:transition motion-safe:duration-300 motion-safe:ease-out group-hover:scale-110 sm:h-10 sm:w-10"
                  ><svg
                    width="22"
                    height="22"
                    viewBox="0 -960 960 960"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    aria-hidden="true"
                    class="material-symbols material-symbols_hub shrink-0 text-white [&amp;_svg]:drop-shadow-[0_2px_6px_rgb(0_0_0_/_0.45)] sm:[&amp;_svg]:scale-105"
                  >
                    <path
                      d="M230.58-20.78q-53.06 0-89.73-36.99-36.68-36.99-36.68-90.05 0-53.05 36.82-89.72 36.81-36.68 89.62-36.68 14 0 25.91 2.22t22.35 6.65l77.09-98.08q-17.31-22.44-27.31-51.37-10-28.94-5.56-59.24L211.7-514.48q-16.13 25.57-42.76 40.13-26.63 14.57-61.16 14.57-53.04 0-90.02-36.82-36.98-36.81-36.98-89.62 0-53.04 36.99-90.3t90.05-37.26q53.05 0 89.72 37.26 36.68 37.26 36.68 90.3v2.31l111.82 42q18-30.87 43.22-47.59 25.22-16.72 54.52-24.28v-119.96q-39-11.56-64.89-46.39T353-855.61q0-53.04 36.99-90.3 36.99-37.27 90.04-37.27 53.06 0 90.01 37.27Q607-908.65 607-855.61q0 40.65-26.11 75.48-26.11 34.83-64.67 46.39v119.96q29.3 7.56 55.02 24.56 25.72 17 44.28 47.31l110.26-42v-2.31q0-53.04 36.82-90.3 36.81-37.26 89.62-37.26 53.04 0 90.3 37.27t37.26 90.33q0 53.05-37.26 89.72-37.26 36.68-90.3 36.68-34.49 0-61.64-14.57-27.15-14.56-42.84-40.69l-110.83 41q3.31 30.87-5.63 59.52-8.93 28.65-27.24 51.09l77.66 99.21q10.43-5 22.06-7.5 11.63-2.5 25.63-2.5 52.81 0 89.9 36.82 37.1 36.81 37.1 89.62 0 53.04-37.1 90.02-37.09 36.98-89.9 36.98-53.04 0-90.02-36.98t-36.98-90.02q0-21.82 5.78-39.45 5.79-17.64 15.79-33.2l-76.53-97.53q-32 15.31-67.93 15.31-35.93 0-67.37-15.31l-76.09 98.53q10 15.56 15.79 32.7 5.78 17.13 5.78 38.95 0 53.04-36.99 90.02t-90.04 36.98Z"
                      fill="currentColor"
                    ></path></svg
                ></span>
              </div>
              <div
                class="relative z-[5] mt-auto flex min-h-[6rem] flex-col justify-end px-2.5 pb-2.5 pt-10 text-left sm:min-h-[6.5rem] sm:px-3 sm:pb-3"
              >
                <h3
                  class="feature-card-title feature-card-title--poster line-clamp-2 min-w-0 text-left text-[13px] font-bold leading-snug sm:text-[14px]"
                  title="拓扑管理"
                >
                  拓扑管理
                </h3>
                <!---->
              </div>
              <div class="pointer-events-none absolute inset-0 z-[4] overflow-hidden rounded-[inherit]" aria-hidden="true">
                <div class="feature-card-sheen feature-card-sheen--cinematic absolute inset-0 mix-blend-overlay"></div>
              </div>
            </article>
            <article
              role="button"
              tabindex="0"
              class="feature-card group relative flex flex-col overflow-hidden border motion-safe:will-change-transform focus:outline-none focus-visible:ring-2 focus-visible:ring-violet-400/55 focus-visible:ring-offset-1 rounded-2xl flex-none min-w-[118px] w-[168px] max-w-[176px] sm:min-w-[122px] sm:w-[176px] border-white/15 bg-zinc-950 feature-card--cinematic-home feature-card--poster-layout feature-card--cine-function shadow-none ring-1 ring-slate-300/40 shadow-[inset_0_1px_0_rgb(255_255_255/0.1)] feature-card--interactive cursor-pointer"
              style="
                translate: none;
                rotate: none;
                scale: none;
                transform-origin: 50% 50%;
                transform: translate(0px, 0px);
                opacity: 1;
                visibility: inherit;
                box-shadow:
                  rgba(255, 255, 255, 0.45) 0px 1px 0px inset,
                  rgba(51, 65, 85, 0.16) 0px 10px 28px -6px,
                  rgba(30, 41, 59, 0.1) 0px 22px 48px -12px,
                  rgba(0, 0, 0, 0.09) 0px 4px 14px -4px;
              "
            >
              <div class="pointer-events-none absolute inset-0 z-0 overflow-hidden rounded-[inherit]" aria-hidden="true">
                <img
                  src="@/assets/cards/photo-1633265486064-086b219458ec.jpg"
                  alt=""
                  class="absolute inset-0 h-full w-full object-cover object-center"
                  loading="lazy"
                  decoding="async"
                  fetchpriority="low"
                  referrerpolicy="no-referrer"
                />
                <div class="feature-card-poster-base absolute inset-0 feature-card-poster--ipam feature-card-poster-base--over-photo"></div>
                <div class="feature-card-cinematic-ambient absolute -left-1/4 -top-1/4 h-[150%] w-[150%]"></div>
              </div>
              <div class="feature-card-cinematic-vignette pointer-events-none absolute inset-0 z-[1] rounded-[inherit]" aria-hidden="true"></div>
              <div class="pointer-events-none absolute inset-0 z-[1] overflow-hidden rounded-[inherit]" aria-hidden="true">
                <div class="feature-card-cinematic-sweep"></div>
              </div>
              <div class="feature-card-cinematic-grain pointer-events-none absolute inset-0 z-[1] rounded-[inherit]" aria-hidden="true"></div>
              <div class="feature-card-poster-scrim pointer-events-none absolute inset-0 z-[2] rounded-[inherit]" aria-hidden="true"></div>
              <span
                class="feature-card-glow-ring pointer-events-none absolute inset-0 z-[2] rounded-[inherit] ring-1 ring-inset ring-white/20"
                aria-hidden="true"
              ></span>
              <div class="pointer-events-none absolute right-2 top-[2.35rem] z-[6] sm:top-[2.5rem]" aria-hidden="true">
                <span
                  class="feature-card-icon-wrap--poster flex h-9 w-9 items-center justify-center rounded-full bg-black/40 text-white ring-1 ring-white/25 backdrop-blur-md motion-safe:transition motion-safe:duration-300 motion-safe:ease-out group-hover:scale-110 sm:h-10 sm:w-10"
                  ><svg
                    width="22"
                    height="22"
                    viewBox="0 -960 960 960"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    aria-hidden="true"
                    class="material-symbols material-symbols_lan shrink-0 text-white [&amp;_svg]:drop-shadow-[0_2px_6px_rgb(0_0_0_/_0.45)] sm:[&amp;_svg]:scale-105"
                  >
                    <path
                      d="M107-146.22v-127.95q0-32.67 23.28-55.94 23.27-23.28 55.94-23.28h44.17V-437q0-32.66 23.28-55.94t55.94-23.28h134.17v-90.39h-44.17q-32.66 0-55.94-23.28-23.28-23.27-23.28-56.5v-127.39q0-32.67 23.28-55.94Q366.95-893 399.61-893h160.78q32.66 0 55.94 23.28 23.28 23.27 23.28 55.94v127.39q0 33.23-23.28 56.5-23.28 23.28-55.94 23.28h-44.17v90.39h134.17q32.66 0 55.94 23.28T729.61-437v83.61h44.17q32.67 0 55.94 23.28Q853-306.84 853-274.17v127.95q0 32.67-23.28 55.94Q806.45-67 773.78-67H616.39q-33.23 0-56.5-23.28-23.28-23.27-23.28-55.94v-130.21q0-31.54 22.71-54.25t54.25-22.71h43.04v-90.39H303.39v90.39h43.04q31.54 0 54.25 22.71t22.71 54.25v130.21q0 32.67-23.28 55.94Q376.84-67 344.17-67H186.22q-32.67 0-55.94-23.28Q107-113.55 107-146.22Z"
                      fill="currentColor"
                    ></path></svg
                ></span>
              </div>
              <div
                class="relative z-[5] mt-auto flex min-h-[6rem] flex-col justify-end px-2.5 pb-2.5 pt-10 text-left sm:min-h-[6.5rem] sm:px-3 sm:pb-3"
              >
                <h3
                  class="feature-card-title feature-card-title--poster line-clamp-2 min-w-0 text-left text-[13px] font-bold leading-snug sm:text-[14px]"
                  title="网络配置管理"
                >
                  网络配置管理
                </h3>
                <!---->
              </div>
              <div class="pointer-events-none absolute inset-0 z-[4] overflow-hidden rounded-[inherit]" aria-hidden="true">
                <div class="feature-card-sheen feature-card-sheen--cinematic absolute inset-0 mix-blend-overlay"></div>
              </div>
            </article>
            <article
              role="button"
              tabindex="0"
              class="feature-card group relative flex flex-col overflow-hidden border motion-safe:will-change-transform focus:outline-none focus-visible:ring-2 focus-visible:ring-violet-400/55 focus-visible:ring-offset-1 rounded-2xl flex-none min-w-[118px] w-[168px] max-w-[176px] sm:min-w-[122px] sm:w-[176px] border-white/15 bg-zinc-950 feature-card--cinematic-home feature-card--poster-layout feature-card--cine-function shadow-none ring-1 ring-slate-300/40 shadow-[inset_0_1px_0_rgb(255_255_255/0.1)] feature-card--interactive cursor-pointer"
              style="
                translate: none;
                rotate: none;
                scale: none;
                transform-origin: 50% 50%;
                transform: translate(0px, 0px);
                opacity: 1;
                visibility: inherit;
                box-shadow:
                  rgba(255, 255, 255, 0.45) 0px 1px 0px inset,
                  rgba(51, 65, 85, 0.16) 0px 10px 28px -6px,
                  rgba(30, 41, 59, 0.1) 0px 22px 48px -12px,
                  rgba(0, 0, 0, 0.09) 0px 4px 14px -4px;
              "
            >
              <div class="pointer-events-none absolute inset-0 z-0 overflow-hidden rounded-[inherit]" aria-hidden="true">
                <img
                  src="@/assets/cards/photo-1451187580459-43490279c0fa.jpg"
                  alt=""
                  class="absolute inset-0 h-full w-full object-cover object-center"
                  loading="lazy"
                  decoding="async"
                  fetchpriority="low"
                  referrerpolicy="no-referrer"
                />
                <div class="feature-card-poster-base absolute inset-0 feature-card-poster--topology feature-card-poster-base--over-photo"></div>
                <div class="feature-card-cinematic-ambient absolute -left-1/4 -top-1/4 h-[150%] w-[150%]"></div>
              </div>
              <div class="feature-card-cinematic-vignette pointer-events-none absolute inset-0 z-[1] rounded-[inherit]" aria-hidden="true"></div>
              <div class="pointer-events-none absolute inset-0 z-[1] overflow-hidden rounded-[inherit]" aria-hidden="true">
                <div class="feature-card-cinematic-sweep"></div>
              </div>
              <div class="feature-card-cinematic-grain pointer-events-none absolute inset-0 z-[1] rounded-[inherit]" aria-hidden="true"></div>
              <div class="feature-card-poster-scrim pointer-events-none absolute inset-0 z-[2] rounded-[inherit]" aria-hidden="true"></div>
              <span
                class="feature-card-glow-ring pointer-events-none absolute inset-0 z-[2] rounded-[inherit] ring-1 ring-inset ring-white/20"
                aria-hidden="true"
              ></span>
              <div class="pointer-events-none absolute right-2 top-[2.35rem] z-[6] sm:top-[2.5rem]" aria-hidden="true">
                <span
                  class="feature-card-icon-wrap--poster flex h-9 w-9 items-center justify-center rounded-full bg-black/40 text-white ring-1 ring-white/25 backdrop-blur-md motion-safe:transition motion-safe:duration-300 motion-safe:ease-out group-hover:scale-110 sm:h-10 sm:w-10"
                  ><svg
                    width="22"
                    height="22"
                    viewBox="0 -960 960 960"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    aria-hidden="true"
                    class="material-symbols material-symbols_hub shrink-0 text-white [&amp;_svg]:drop-shadow-[0_2px_6px_rgb(0_0_0_/_0.45)] sm:[&amp;_svg]:scale-105"
                  >
                    <path
                      d="M230.58-20.78q-53.06 0-89.73-36.99-36.68-36.99-36.68-90.05 0-53.05 36.82-89.72 36.81-36.68 89.62-36.68 14 0 25.91 2.22t22.35 6.65l77.09-98.08q-17.31-22.44-27.31-51.37-10-28.94-5.56-59.24L211.7-514.48q-16.13 25.57-42.76 40.13-26.63 14.57-61.16 14.57-53.04 0-90.02-36.82-36.98-36.81-36.98-89.62 0-53.04 36.99-90.3t90.05-37.26q53.05 0 89.72 37.26 36.68 37.26 36.68 90.3v2.31l111.82 42q18-30.87 43.22-47.59 25.22-16.72 54.52-24.28v-119.96q-39-11.56-64.89-46.39T353-855.61q0-53.04 36.99-90.3 36.99-37.27 90.04-37.27 53.06 0 90.01 37.27Q607-908.65 607-855.61q0 40.65-26.11 75.48-26.11 34.83-64.67 46.39v119.96q29.3 7.56 55.02 24.56 25.72 17 44.28 47.31l110.26-42v-2.31q0-53.04 36.82-90.3 36.81-37.26 89.62-37.26 53.04 0 90.3 37.27t37.26 90.33q0 53.05-37.26 89.72-37.26 36.68-90.3 36.68-34.49 0-61.64-14.57-27.15-14.56-42.84-40.69l-110.83 41q3.31 30.87-5.63 59.52-8.93 28.65-27.24 51.09l77.66 99.21q10.43-5 22.06-7.5 11.63-2.5 25.63-2.5 52.81 0 89.9 36.82 37.1 36.81 37.1 89.62 0 53.04-37.1 90.02-37.09 36.98-89.9 36.98-53.04 0-90.02-36.98t-36.98-90.02q0-21.82 5.78-39.45 5.79-17.64 15.79-33.2l-76.53-97.53q-32 15.31-67.93 15.31-35.93 0-67.37-15.31l-76.09 98.53q10 15.56 15.79 32.7 5.78 17.13 5.78 38.95 0 53.04-36.99 90.02t-90.04 36.98Z"
                      fill="currentColor"
                    ></path></svg
                ></span>
              </div>
              <div
                class="relative z-[5] mt-auto flex min-h-[6rem] flex-col justify-end px-2.5 pb-2.5 pt-10 text-left sm:min-h-[6.5rem] sm:px-3 sm:pb-3"
              >
                <h3
                  class="feature-card-title feature-card-title--poster line-clamp-2 min-w-0 text-left text-[13px] font-bold leading-snug sm:text-[14px]"
                  title="自动发现"
                >
                  自动发现
                </h3>
                <!---->
              </div>
              <div class="pointer-events-none absolute inset-0 z-[4] overflow-hidden rounded-[inherit]" aria-hidden="true">
                <div class="feature-card-sheen feature-card-sheen--cinematic absolute inset-0 mix-blend-overlay"></div>
              </div>
            </article>
          </div>
        </div>
        <!---->
      </div>
    </div>
  </div>
</template>

<style scoped lang="less">
@import 'style.css';
</style>
