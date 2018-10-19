import { MessageContainer } from "../../shared/net/MessageContainer"
import { MessageHandlerArray } from "../../shared/net/MessageHandlerArray"
import { AnnounceMessage } from "../../shared/net/messages/AnnounceMessage"
import { MessageType } from "../../shared/net/MessageType"
import { TransferChannel } from "../../shared/net/TransferChannel"

export class NetClient {

  private chl : TransferChannel
  private handlers : MessageHandlerArray

  /**
   * Connect to a remote server
   * @param remoteAddr
   */
  constructor(remoteAddr : string) {
    this.chl = TransferChannel.fromRemoteAddr(remoteAddr);

    // Our message handlers, all message logic will go through this
    this.handlers = new MessageHandlerArray()

    // tell the channel to use these handlers
    this.chl.setCallbackArray(this.handlers)

    // add message handlers
    this.logic()
  }

  public isConnected() : boolean {
    return this.chl.isConnected();
  }

  public logic() {
    // when we receive an announcement
    this.handlers.subscribe(MessageType.Announcement, (chl : TransferChannel, msg : MessageContainer) => {
      const msgCasted : AnnounceMessage = msg as AnnounceMessage;

      // print it to console
      console.log(`We got an announcement: ${msgCasted.getAnnounceText()}`)
    })
  }
}
