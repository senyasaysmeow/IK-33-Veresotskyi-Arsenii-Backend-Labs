<script lang="ts">
  import "../app.css";
  import { config, performerTitleLine } from "$lib/site/config";
  import { page } from "$app/state";
  import { resolve } from "$app/paths";
  import { onMount, type Snippet } from "svelte";

  let { children }: { children: Snippet } = $props();

  const authorHref = "https://t.me/senyasaysmeow";
  const homeHref = resolve("/");
  const labHref = (slug: string) => resolve(`/lab/${slug}` as `/lab/${string}`);

  onMount(() => {
    const imgs = Array.from(
      document.querySelectorAll<HTMLImageElement>(".md img"),
    );
    for (const img of imgs) {
      const markBroken = () => img.classList.add("img-broken");
      img.addEventListener("error", markBroken);
      if (img.complete && img.naturalWidth === 0) markBroken();
    }
  });
</script>

<div class="container">
  <section class="cover">
    <div class="cover-main">
      <h1 class="cover-title">
        {config.report?.title ?? "ЗВІТИ З ЛАБОРАТОРНИХ РОБІТ"}
      </h1>

      {#if config.report?.subjectLine}
        <div class="cover-subtitle">{config.report.subjectLine}</div>
      {/if}

      <div class="cover-performer">{performerTitleLine(config.student)}</div>
    </div>
  </section>

  <nav class="lab-buttons" aria-label="Навігація по роботах">
    {#each config.labs as lab}
      {@const to = labHref(lab.slug)}
      <a class="lab-btn" class:active={page.url.pathname === to} href={to}>
        {lab.button}
      </a>
    {/each}
  </nav>

  <main class="main">
    {@render children()}
  </main>

  <footer class="footer">
    <a class="footer-link" href={authorHref} target="_blank">senyasaysmeow</a>
    <span class="footer-sep">·</span>
    <a class="footer-link" href={homeHref}>На головну</a>
  </footer>
</div>
