import { FilterByPipe } from './filter-by';

describe('FilterByPipe', () => {
  let pipe: FilterByPipe;

  const users = [
    // tslint:disable:max-line-length
    {
      id: 1,
      first_name: 'John',
      last_name: 'Doe',
      work: {
        title: 'Software Engineer',
        company: 'Foo Tech',
        previous_company: 'Unknown',
      },
      arr: [{ name: 'baz' }],
      current_employed: true,
      prop: 1,
    },
    {
      id: 2,
      first_name: 'Jane',
      last_name: 'West',
      work: {
        title: 'Designer',
        company: 'AAA Solutions',
        previous_company: 'Unknown',
      },
      arr: [{ name: 'bar' }],
      current_employed: false,
    },
    {
      id: 3,
      first_name: 'Bruce',
      last_name: 'John',
      work: {
        title: 'Software Engineer',
        company: 'Bar Tech',
        previous_company: 'Unknown',
      },
      arr: [{ name: 'foo' }],
      current_employed: true,
    },
    {
      id: 4,
      first_name: 'William',
      last_name: 'Cent',
      work: {
        title: 'Designer',
        company: 'Foo Tech',
        previous_company: 'Bar Tech',
      },
      arr: [{ name: 'foo' }, { name: 'bar' }],
      current_employed: false,
    },
    // tslint:enable:max-line-length
  ];

  beforeEach(() => {
    pipe = new FilterByPipe();
  });

  it('should not do anything in-case of not an array', () => {
    expect(pipe.transform('foo', [''], '')).toEqual('foo');
    expect(pipe.transform(null, [''], '')).toEqual(null);
    expect(pipe.transform(undefined, [''], '')).toEqual(undefined);
    expect(pipe.transform(42, [''], '')).toEqual(42);
    expect(pipe.transform({ foo: 1, bar: 2 }, [''], '')).toEqual({
      foo: 1,
      bar: 2,
    });
  });

  it('should filter by single field with no value to only check if property is defined', () => {
    const filtered = pipe.transform(users, ['prop']);

    expect(filtered.length).toEqual(1);
    expect(filtered[0]).toEqual(users[0]);
  });

  it('should filter by single field with a single result', () => {
    const filtered = pipe.transform(users, ['id'], 1);

    expect(filtered.length).toEqual(1);
    expect(filtered[0]).toEqual(users[0]);
  });

  it('should filter by boolean value', () => {
    const filtered = pipe.transform(users, ['current_employed'], true);

    expect(filtered.length).toEqual(2);
    expect(filtered[0]).toEqual(users[0]);
    expect(filtered[1]).toEqual(users[2]);
  });

  it('should filter by multiple fields with a two result', () => {
    const filtered = pipe.transform(users, ['first_name', 'last_name'], 'John');

    expect(filtered.length).toEqual(2);
    expect(filtered[0]).toEqual(users[0]);
    expect(filtered[1]).toEqual(users[2]);
  });

  it('should filter by nested field with a single result', () => {
    const filtered = pipe.transform(users, ['work.company'], 'Bar');

    expect(filtered.length).toEqual(1);
    expect(filtered[0]).toEqual(users[2]);
  });

  it('should filter by nested field with a multiple result', () => {
    const filtered = pipe.transform(users, ['work.title'], 'Designer');

    expect(filtered.length).toEqual(2);
    expect(filtered[0]).toEqual(users[1]);
    expect(filtered[1]).toEqual(users[3]);
  });

  it('should filter by multiple nested field with a multiple result', () => {
    const filtered = pipe.transform(users, ['work.company', 'work.previous_company'], 'Bar Tech');

    expect(filtered.length).toEqual(2);
    expect(filtered[0]).toEqual(users[2]);
    expect(filtered[1]).toEqual(users[3]);
  });

  it('should filter by field with a strict mode', () => {
    const filtered = pipe.transform(users, ['work.company'], 'Bar', true);

    expect(filtered.length).toEqual(0);
  });

  it('should filter child property which is an array', () => {
    const filtered = pipe.transform(users, ['arr.name'], 'foo', true);
    const filteredBar = pipe.transform(users, ['arr.name'], 'bar', true);
    const filteredBaz = pipe.transform(users, ['arr.name'], 'baz', true);

    expect(filtered.length).toEqual(2);
    expect(filteredBar.length).toEqual(2);
    expect(filteredBaz.length).toEqual(1);
  });

  it('should filter for an array of values', () => {
    const filtered = pipe.transform(users, ['first_name'], ['John', 'Jane']);

    expect(filtered.length).toEqual(2);
    expect(filtered[0]).toEqual(users[0]);
    expect(filtered[1]).toEqual(users[1]);
  });

  it('should filter for an array of values, with an array of properties', () => {
    const filtered = pipe.transform(users, ['first_name', 'last_name'], ['John', 'Cent']);

    expect(filtered.length).toEqual(3);
    expect(filtered[0]).toEqual(users[0]);
    expect(filtered[1]).toEqual(users[2]);
    expect(filtered[2]).toEqual(users[3]);
  });
});
