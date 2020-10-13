import React from "react";
import {create, ReactTestInstance} from "react-test-renderer";
import ProfileStatus from "./ProfileStatus";


describe("ProfileStat component", () => {
    test("status from props should be in the state", () => {
        const component = create(<ProfileStatus status="it-kamasutra.com" updateStatus={() => {
        }}/>);
        const instance: any = component.getInstance();
        expect(instance.state.status).toBe("it-kamasutra.com");
    });
    test("after creation <span> should be displayed with correct status", () => {
        const component = create(<ProfileStatus status="it-kamasutra.com" updateStatus={() => {
        }}/>);
        const root: ReactTestInstance = component.root; // Need type for instance
        let span = root.findByType("span")
        expect(span).not.toBeNull(); // спан не должен быть null когда показан статус
    });
    test("after creation <input> should'nt be displayed with correct status", () => {
        const component = create(<ProfileStatus status="it-kamasutra.com" updateStatus={() => {
        }}/>);
        const root: ReactTestInstance = component.root;
        expect(() => {  // инпут должен быть скрыт когда показуется статус
            let input = root.findByType("input")
        }).toThrow()
    });
    test("after creation <span/> should should contains correct status", () => {
        const component = create(<ProfileStatus status="it-kamasutra.com" updateStatus={() => {
        }}/>);
        const root: ReactTestInstance = component.root; // Need type for instance
        let span = root.findByType("span");
        expect(span.children[0]).toBe("it-kamasutra.com");
    });
    test("input should be displayed in editMode instead of span", () => {
        const component = create(<ProfileStatus status="it-kamasutra.com" updateStatus={() => {
        }}/>);
        const root: ReactTestInstance = component.root; // Need type for instance
        let span = root.findByType("span"); // находит спан
        span.props.onDoubleClick() // делается дабл клик
        let input = root.findByType("input"); // находится инпут
        expect(input.props.value).toBe("it-kamasutra.com"); // в инпуте value = it-kamasutra.com
    });
    test("callback should be called", () => {
        const mockCallback = jest.fn()
        const component = create(<ProfileStatus status="it-kamasutra.com" updateStatus={mockCallback}/>);
        const instance: ReactTestInstance = component.getInstance();
        instance.deactivateMode()
        expect(mockCallback.mock.calls.length).toBe(1);
    });
});