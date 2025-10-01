If you run the compiler while targeting a file, TypeScript will ignore the tsconfig.json file.

```shell
tsc ./file.ts
```

In order to compile correctly with your configurations, you need to run tsc while navigated into the directory.

```shell
cd compiler-and-config (or your src folder)
tsc
```

As an example, I compiled basics (aka basics0) from the basics section, with these configurations.
I renamed this file to 'example.ts'

As you can see, in the './build' directory there are now four files:

- A types file
- The script compiled into JS (with our config)
- Map files for both of these files.

The types file is empty, because we didnt define any types in basics0;
The script looks pretty similar, but there's some extra module syntax;
And the map files are just for TypeScript processing (afaik);