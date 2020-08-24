export { default as Editor } from "./components/Editor.vue";

import Connection from "./components/connection/ConnectionView.vue";
import ConnectionWrapper from "./components/connection/ConnectionWrapper.vue";
import TemporaryConnection from "./components/connection/TemporaryConnection.vue";
import Node from "./components/node/Node.vue";
import NodeInterface from "./components/node/NodeInterface.vue";
import NodeOption from "./components/node/NodeOption.vue";
import ContextMenu from "./components/ContextMenu.vue";

// Fixed: Removed Sidebar 

export const Components = {
    Connection, ConnectionWrapper, TemporaryConnection,
    Node, NodeInterface, NodeOption,
    ContextMenu
};

export * from "./baklavaVuePlugin";
export * from "./viewPlugin";
