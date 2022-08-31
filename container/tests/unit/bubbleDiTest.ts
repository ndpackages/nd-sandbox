import tester from "../../../../tool/test/domain/libs/tester";
import {DiContainer} from "bubble-di";
import assert from "../../../../tool/test/domain/libs/assert";

tester.define('bubbleDiTest.1', function () {

    DiContainer.setContainer(new DiContainer());
    let container = DiContainer.getContainer();

    class Bar {
        name = 'Bar111';
        sayBar() {
            console.log("bar");
        }
    }

    class Baz {
        name = 'Baz111';
        sayBaz() {
            console.log("baz");
        }
    }

    class Foo {
        bar;
        baz;
        constructor(bar, baz) {
            this.bar = bar;
            this.baz = baz;
        }
        printText() {
            this.bar.sayBar();
            this.baz.sayBaz();
        }
    }

    container.registerInstance("bar", new Bar());
    container.registerInstance("baz", new Baz());
    container.register("foo", {
            dependencies: ["bar", "baz"],
            factoryMethod: (bar, baz) => new Foo(bar, baz)
        },
    );
    const foo = container.resolve("foo");

    assert.isEqual('Bar111', foo.bar.name);
    //console.log(foo.bar.name);
    // foo.printText(); // will print "bar" and "baz".

});
