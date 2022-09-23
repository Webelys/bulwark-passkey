import React from "react";

type TitleBarButtonProps = {
    text: string;
    onClick?: React.MouseEventHandler<HTMLDivElement>;
};

export class TitleBarButton extends React.Component<TitleBarButtonProps> {
    render() {
        return (
            <div
                className="daisy-btn daisy-btn-sm daisy-btn-ghost"
                onClick={this.props.onClick}
            >
                {this.props.text}
            </div>
        );
    }
}

type TitleBarProps = {
    title: string;
    leftButton?: React.ReactElement;
    rightButton?: React.ReactElement;
};

export class TitleBar extends React.Component<TitleBarProps> {
    render() {
        // Add empty divs if there are no buttons so flexbox spacing works correctly with only 1 button
        return (
            <div className="h-12 flex justify-between items-center bg-slate-400 border-b border-slate-500 px-2">
                {this.props.leftButton || <div />}
                <div className="font-bold text-lg">{this.props.title}</div>
                {this.props.rightButton || <div />}
            </div>
        );
    }
}