import React, { PureComponent } from 'react';

class MailToEncoder extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      strMailto: '',
    };
  }

  handleSubmit = (e) => {
    e.preventDefault();

    //  extract the node list from the form
    const { to, cc, bcc, subject, body, display } = this.form;

    // mailto:to?subject=subject&cc=cc&bcc=bcc&body=body
    let string = `mailto:${to.value}?`;

    if (cc.value !== '') {
      string += `cc=${cc.value}&`;
    }

    if (bcc.value !== '') {
      string += `bcc=${bcc.value}&`;
    }

    if (subject.value !== '') {
      string += `subject=${encodeURIComponent(subject.value)}&`;
    }

    if (body.value !== '') {
      string += `body=${encodeURIComponent(body.value)}&`;
    }

    this.setState({
      strMailto: string.substr(0, string.length - 1),
    });

    display.focus();
  	display.select();
  }

  render() {
    return (
      <React.Fragment>
        <h1>MailTo Encoder</h1>
        <p className="subheader">
          The mailto URL encoder does the dirty work of composing perfect and perfectly encoded mailto: URLs (with default subject, body text, bcc and what not) for you.
        </p>

        <form onSubmit={this.handleSubmit} ref={form => this.form = form}>
          <p className="left util-m-t-0">
            <label htmlFor="to">To</label>
            <input tabIndex="1" name="to" id="to" className="inputSlug" />
          </p>

          <p className="left util-m-t-0">
            <label htmlFor="cc">CC</label>
            <input tabIndex="1" name="cc" id="cc" className="inputSlug" />
          </p>

          <p className="left util-m-t-0">
            <label htmlFor="bcc">BCC</label>
            <input tabIndex="1" name="bcc" id="bcc" className="inputSlug" />
          </p>

          <p className="left util-m-t-0">
            <label htmlFor="subject">Subject</label>
            <input tabIndex="1" name="subject" id="subject" className="inputSlug" />
          </p>

          <p className="left util-m-t-0">
            <label htmlFor="body">Body</label>
            <textarea tabIndex="5" accessKey="b" name="body" id="body" rows="10" />
          </p>

          <input tabIndex="6" type="submit" value="-v- display mailto URL -v-" className="button" />

          <p className="left util-m-t-0">
            <label htmlFor="display">URL</label>
            <textarea name="display" id="display" rows="10" value={this.state.strMailto} readOnly />
          </p>
        </form>

      </React.Fragment>
    );
  }
};

export default MailToEncoder; // Don’t forget to use export default!
