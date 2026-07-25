"use client";

import { useEffect, useState } from "react";

export function ServiceWorkerRegistration() {
  const [online, setOnline] = useState(true);
  const [updateReady, setUpdateReady] = useState(false);
  const [updateWorker, setUpdateWorker] = useState<ServiceWorker | null>(null);

  useEffect(() => {
    const reflectConnection = () => setOnline(navigator.onLine);
    reflectConnection();
    window.addEventListener("online", reflectConnection);
    window.addEventListener("offline", reflectConnection);
    if ("serviceWorker" in navigator && process.env.NODE_ENV === "production") {
      const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
      navigator.serviceWorker
        .register(`${basePath}/sw.js`, { scope: `${basePath}/` })
        .then((registration) => {
          const exposeWaitingUpdate = (worker: ServiceWorker | null) => {
            if (worker && navigator.serviceWorker.controller) {
              setUpdateReady(true);
              setUpdateWorker(worker);
            }
          };

          // `updatefound` may have fired before React mounted or while this tab
          // was closed. Surface an already-waiting generation immediately.
          exposeWaitingUpdate(registration.waiting);

          registration.addEventListener("updatefound", () => {
            const worker = registration.installing;
            worker?.addEventListener("statechange", () => {
              if (worker.state === "installed") {
                exposeWaitingUpdate(registration.waiting ?? worker);
              }
            });
          });
        })
        .catch(() => {
          // The app remains fully usable online when registration is unavailable.
        });
    }
    return () => {
      window.removeEventListener("online", reflectConnection);
      window.removeEventListener("offline", reflectConnection);
    };
  }, []);

  return (
    <div className="connection-status" aria-live="polite">
      {!online && <span>You&apos;re offline — saved study tools remain available.</span>}
      {updateReady && (
        <button
          onClick={() => {
            navigator.serviceWorker.addEventListener(
              "controllerchange",
              () => window.location.reload(),
              { once: true },
            );
            updateWorker?.postMessage({ type: "SKIP_WAITING" });
          }}
        >
          Updated questions are ready · Reload
        </button>
      )}
    </div>
  );
}
