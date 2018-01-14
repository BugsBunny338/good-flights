import React, {Component} from 'react';
import {Container, Row, Col} from 'reactstrap';
import {connect} from "react-redux";

import actions from "../../store/actions";

class NavBreadCrumb extends Component {

    constructor(props) {
        super(props);
        this.state = {};
        this.setPages = this.setPages.bind(this);
    }

    setPages(e, pageIndex) {
        //this.props.onPagesSubmit({pages});
        let pages = this.props.navigation.pages.slice(0,pageIndex + 1);
        if(pageIndex === 0) {
            this.props.onResetData();
        }
        this.props.onPagesSubmit({pages});
        console.log(pageIndex);
        e.preventDefault();
    }

    render() {
        let breadcrumbs = <div></div>;
        if(this.props.navigation.pages) {
            breadcrumbs = this.props.navigation.pages.reduce( (a,b) => {
                let index = a.length / 2;
                a.push(<div style={{display:'inline-block'}} key={Math.random()}>&nbsp;&gt;&nbsp;</div>);
                a.push(<a href="" key={b.breadcrumb} onClick={(e) => this.setPages(e, index)}>{b.breadcrumb}</a>);
                return a;
            }, []);
        }
        return (
            <Container fluid={true}>
                <Row>
                    <Col xs={12}>
                        {breadcrumbs}
                    </Col>
                </Row>
            </Container>

        );
    }

}

function mapDispatchToProps(dispatch) {
    return {
        onPagesSubmit: (state) => {
            dispatch({type: actions.SET_PAGES, pages: state.pages})
        },
        onResetData: () => {
            dispatch({type: actions.RESET_DATA})
        }
    }
}

function mapStateToProps(state) {
    return {
        data: state.data,
        navigation: state.navigation
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(NavBreadCrumb);