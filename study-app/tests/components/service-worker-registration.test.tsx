import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";

import { ServiceWorkerRegistration as ServiceWorkerRegistrationBanner } from "@/components/service-worker-registration";

describe("ServiceWorkerRegistration", () => {
  afterEach(() => {
    vi.unstubAllEnvs();
    vi.restoreAllMocks();
  });

  it("surfaces an update that was already waiting before the component mounted", async () => {
    vi.stubEnv("NODE_ENV", "production");
    const postMessage = vi.fn();
    const addServiceWorkerListener = vi.fn();
    const waiting = { postMessage } as unknown as ServiceWorker;
    const registration = {
      waiting,
      addEventListener: vi.fn(),
    } as unknown as ServiceWorkerRegistration;
    const serviceWorkerContainer = {
      controller: {} as ServiceWorker,
      register: vi.fn().mockResolvedValue(registration),
      addEventListener: addServiceWorkerListener,
    } as unknown as ServiceWorkerContainer;

    Object.defineProperty(navigator, "serviceWorker", {
      configurable: true,
      value: serviceWorkerContainer,
    });

    render(<ServiceWorkerRegistrationBanner />);

    const reloadButton = await screen.findByRole("button", {
      name: /Updated questions are ready/i,
    });
    fireEvent.click(reloadButton);

    await waitFor(() => {
      expect(postMessage).toHaveBeenCalledWith({ type: "SKIP_WAITING" });
    });
    expect(addServiceWorkerListener).toHaveBeenCalledWith(
      "controllerchange",
      expect.any(Function),
      { once: true },
    );
  });
});
