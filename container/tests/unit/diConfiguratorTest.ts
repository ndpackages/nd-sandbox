import tester from "../../../../tool/test/domain/libs/tester";
import assert from "../../../../tool/test/domain/libs/assert";
import DiConfigurator from "../../libs/DiConfigurator";
import diFactory from "../../factories/diFactory";

let di = diFactory.createDi();
let diConfigurator = new DiConfigurator();
diConfigurator.di = di;

class Counter {
    count = 0;
}

tester.define('diConfiguratorTest.bind.asFunctionShort', function () {
    diConfigurator.bind("counter", () => new Counter());
    let counter = di.resolve("counter");
    counter.count = 1;

    assert.isEqual(1, counter.count);

    counter = di.resolve("counter");
    assert.isEqual(0, counter.count);
});

tester.define('diConfiguratorTest.bind.asFunction', function () {
    diConfigurator.bind("counter", () => {
        return new Counter();
    });
    let counter = di.resolve("counter");
    counter.count = 1;

    assert.isEqual(1, counter.count);

    counter = di.resolve("counter");
    assert.isEqual(0, counter.count);
});

tester.define('diConfiguratorTest.bind.asClass', function () {
    diConfigurator.bind("counter", Counter);
    let counter = di.resolve("counter");
    counter.count = 1;

    assert.isEqual(1, counter.count);

    counter = di.resolve("counter");
    assert.isEqual(0, counter.count);
});

tester.define('diConfiguratorTest.bind.asObject', function () {
    diConfigurator.bind("counter", new Counter());
    let counter = di.resolve("counter");
    counter.count = 1;

    assert.isEqual(1, counter.count);

    counter = di.resolve("counter");
    assert.isEqual(0, counter.count);
});

tester.define('diConfiguratorTest.singleton.asFunction', function () {
    diConfigurator.singleton("counter", () => {
        return new Counter();
    });

    let counter = di.resolve("counter");
    counter.count = 1;

    assert.isEqual(1, counter.count);

    counter = di.resolve("counter");
    assert.isEqual(1, counter.count);
});

tester.define('diConfiguratorTest.singleton.asClass', function () {
    diConfigurator.singleton("counter", Counter);

    let counter = di.resolve("counter");
    counter.count = 1;

    assert.isEqual(1, counter.count);

    counter = di.resolve("counter");
    assert.isEqual(1, counter.count);
});

tester.define('diConfiguratorTest.singleton.asObject', function () {
    diConfigurator.singleton("counter", new Counter());

    let counter = di.resolve("counter");
    counter.count = 1;

    assert.isEqual(1, counter.count);

    counter = di.resolve("counter");
    assert.isEqual(1, counter.count);
});
