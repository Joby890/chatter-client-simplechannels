


export default function(chatter) {
  console.log("Simple Channel started");

  this.onEnable = function() {
    var plugin = this;
    if(this.hasAuthed) {
      setup(plugin);
    }
    //this.hasAuthed = false;

    chatter.pluginManager.registerEvent(this, "AfterAuthEvent", function(event) {
      plugin.hasAuthed = true;
      setup(plugin);
    });

};


function setup(plugin) {
    var page;
    var AddChannel = React.createClass({

      componentDidMount:function() {
        var self = this;
        console.log(self, " mounted");
      },

      addChannel: function() {
        chatter.send("createChannel", {name: this.channelName.value});
        this.channelName.value = "";
        chatter.getPanel('right').removePage(page);
        console.log(chatter.getPanel('right').hasPage(page));
      },
      render: function() {
        return React.createElement("div", null,
        React.createElement("input", {ref: function(c)  {
          this.channelName = c;
          return this.channelName;
        }.bind(this)}),
        React.createElement("input", {type:"button", onClick: this.addChannel, value: "Add Channel"})
      );
    }
  });
  page = new Page('addchannel', 0.1,AddChannel);
  var CreateButton = React.createClass({
    showChannel: function() {
      if(!chatter.getPanel('right').hasPage(page)) {
        chatter.getPanel('right').addPage(plugin, page);
      }
    },

    render: function() {
      return React.createElement("input", {type:"button", onClick: this.showChannel, value: "Add"});
    }
  });

  console.log("Adding Channel to right below channels");
  chatter.getPanel('left').addPage(plugin, new Page('createbutton', 2, CreateButton));
}


}
