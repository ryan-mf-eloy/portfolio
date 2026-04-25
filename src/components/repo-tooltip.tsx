"use client";

import { useEffect, useState, type CSSProperties } from "react";
import { PREVIEW_IMAGE_URL, type Repo } from "@/lib/github";
import {
  readPreviewStatus,
  writePreviewStatus,
  type PreviewStatus,
} from "@/lib/preview-cache";

type ImgState = "loading" | "loaded" | "error";

function initialState(repoName: string): ImgState {
  const cached = readPreviewStatus(repoName);
  return cached ?? "loading";
}

export function RepoTooltip({
  repo,
  style,
}: {
  repo: Repo;
  style: CSSProperties;
}) {
  const [imgState, setImgState] = useState<ImgState>(() => initialState(repo.name));

  // Reset state when the hovered repo changes — re-read the cache.
  useEffect(() => {
    setImgState(initialState(repo.name));
  }, [repo.name]);

  const showImage = imgState !== "error";
  const visibleTopics = repo.topics.slice(0, 8);
  const previewUrl = PREVIEW_IMAGE_URL(repo.name);

  function persist(status: PreviewStatus) {
    writePreviewStatus(repo.name, status);
  }

  return (
    <div role="tooltip" className="repo-tooltip" style={style}>
      {showImage && (
        <div className="repo-tooltip__image-wrap">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            key={repo.name}
            src={previewUrl}
            alt=""
            loading="eager"
            decoding="async"
            data-state={imgState}
            className="repo-tooltip__image"
            onLoad={() => {
              setImgState("loaded");
              persist("loaded");
            }}
            onError={() => {
              setImgState("error");
              persist("error");
            }}
          />
        </div>
      )}

      <div className="repo-tooltip__body">
        <div className="repo-tooltip__name">{repo.name}</div>
        {repo.description && (
          <div className="repo-tooltip__desc">{repo.description}</div>
        )}
        {visibleTopics.length > 0 && (
          <div className="repo-tooltip__techs">
            {visibleTopics.map((t) => (
              <span key={t} className="tech-pill">
                {t}
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
