import { createContext } from "react";
export const TabControlContext = createContext(null);
export const VideoFrameContext = createContext(null);
export const PeersContext = createContext(null);
export const MeetingContext = createContext({
  updateDeviceList: () => {},
  updatePeers: () => {},
  updatePeerCount: () => {},
});
