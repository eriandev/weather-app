
(function(l, r) { if (l.getElementById('livereloadscript')) return; r = l.createElement('script'); r.async = 1; r.src = '//' + (window.location.host || 'localhost').split(':')[0] + ':35729/livereload.js?snipver=1'; r.id = 'livereloadscript'; l.head.appendChild(r) })(window.document);
var app = (function () {
    'use strict';

    function noop() { }
    function add_location(element, file, line, column, char) {
        element.__svelte_meta = {
            loc: { file, line, column, char }
        };
    }
    function run(fn) {
        return fn();
    }
    function blank_object() {
        return Object.create(null);
    }
    function run_all(fns) {
        fns.forEach(run);
    }
    function is_function(thing) {
        return typeof thing === 'function';
    }
    function safe_not_equal(a, b) {
        return a != a ? b == b : a !== b || ((a && typeof a === 'object') || typeof a === 'function');
    }
    function validate_store(store, name) {
        if (store != null && typeof store.subscribe !== 'function') {
            throw new Error(`'${name}' is not a store with a 'subscribe' method`);
        }
    }
    function subscribe(store, ...callbacks) {
        if (store == null) {
            return noop;
        }
        const unsub = store.subscribe(...callbacks);
        return unsub.unsubscribe ? () => unsub.unsubscribe() : unsub;
    }
    function component_subscribe(component, store, callback) {
        component.$$.on_destroy.push(subscribe(store, callback));
    }

    function append(target, node) {
        target.appendChild(node);
    }
    function insert(target, node, anchor) {
        target.insertBefore(node, anchor || null);
    }
    function detach(node) {
        node.parentNode.removeChild(node);
    }
    function destroy_each(iterations, detaching) {
        for (let i = 0; i < iterations.length; i += 1) {
            if (iterations[i])
                iterations[i].d(detaching);
        }
    }
    function element(name) {
        return document.createElement(name);
    }
    function svg_element(name) {
        return document.createElementNS('http://www.w3.org/2000/svg', name);
    }
    function text(data) {
        return document.createTextNode(data);
    }
    function space() {
        return text(' ');
    }
    function empty() {
        return text('');
    }
    function attr(node, attribute, value) {
        if (value == null)
            node.removeAttribute(attribute);
        else if (node.getAttribute(attribute) !== value)
            node.setAttribute(attribute, value);
    }
    function children(element) {
        return Array.from(element.childNodes);
    }
    function custom_event(type, detail) {
        const e = document.createEvent('CustomEvent');
        e.initCustomEvent(type, false, false, detail);
        return e;
    }

    let current_component;
    function set_current_component(component) {
        current_component = component;
    }

    const dirty_components = [];
    const binding_callbacks = [];
    const render_callbacks = [];
    const flush_callbacks = [];
    const resolved_promise = Promise.resolve();
    let update_scheduled = false;
    function schedule_update() {
        if (!update_scheduled) {
            update_scheduled = true;
            resolved_promise.then(flush);
        }
    }
    function add_render_callback(fn) {
        render_callbacks.push(fn);
    }
    let flushing = false;
    const seen_callbacks = new Set();
    function flush() {
        if (flushing)
            return;
        flushing = true;
        do {
            // first, call beforeUpdate functions
            // and update components
            for (let i = 0; i < dirty_components.length; i += 1) {
                const component = dirty_components[i];
                set_current_component(component);
                update(component.$$);
            }
            dirty_components.length = 0;
            while (binding_callbacks.length)
                binding_callbacks.pop()();
            // then, once components are updated, call
            // afterUpdate functions. This may cause
            // subsequent updates...
            for (let i = 0; i < render_callbacks.length; i += 1) {
                const callback = render_callbacks[i];
                if (!seen_callbacks.has(callback)) {
                    // ...so guard against infinite loops
                    seen_callbacks.add(callback);
                    callback();
                }
            }
            render_callbacks.length = 0;
        } while (dirty_components.length);
        while (flush_callbacks.length) {
            flush_callbacks.pop()();
        }
        update_scheduled = false;
        flushing = false;
        seen_callbacks.clear();
    }
    function update($$) {
        if ($$.fragment !== null) {
            $$.update();
            run_all($$.before_update);
            const dirty = $$.dirty;
            $$.dirty = [-1];
            $$.fragment && $$.fragment.p($$.ctx, dirty);
            $$.after_update.forEach(add_render_callback);
        }
    }
    const outroing = new Set();
    let outros;
    function group_outros() {
        outros = {
            r: 0,
            c: [],
            p: outros // parent group
        };
    }
    function check_outros() {
        if (!outros.r) {
            run_all(outros.c);
        }
        outros = outros.p;
    }
    function transition_in(block, local) {
        if (block && block.i) {
            outroing.delete(block);
            block.i(local);
        }
    }
    function transition_out(block, local, detach, callback) {
        if (block && block.o) {
            if (outroing.has(block))
                return;
            outroing.add(block);
            outros.c.push(() => {
                outroing.delete(block);
                if (callback) {
                    if (detach)
                        block.d(1);
                    callback();
                }
            });
            block.o(local);
        }
    }

    const globals = (typeof window !== 'undefined' ? window : global);
    function create_component(block) {
        block && block.c();
    }
    function mount_component(component, target, anchor) {
        const { fragment, on_mount, on_destroy, after_update } = component.$$;
        fragment && fragment.m(target, anchor);
        // onMount happens before the initial afterUpdate
        add_render_callback(() => {
            const new_on_destroy = on_mount.map(run).filter(is_function);
            if (on_destroy) {
                on_destroy.push(...new_on_destroy);
            }
            else {
                // Edge case - component was destroyed immediately,
                // most likely as a result of a binding initialising
                run_all(new_on_destroy);
            }
            component.$$.on_mount = [];
        });
        after_update.forEach(add_render_callback);
    }
    function destroy_component(component, detaching) {
        const $$ = component.$$;
        if ($$.fragment !== null) {
            run_all($$.on_destroy);
            $$.fragment && $$.fragment.d(detaching);
            // TODO null out other refs, including component.$$ (but need to
            // preserve final state?)
            $$.on_destroy = $$.fragment = null;
            $$.ctx = [];
        }
    }
    function make_dirty(component, i) {
        if (component.$$.dirty[0] === -1) {
            dirty_components.push(component);
            schedule_update();
            component.$$.dirty.fill(0);
        }
        component.$$.dirty[(i / 31) | 0] |= (1 << (i % 31));
    }
    function init(component, options, instance, create_fragment, not_equal, props, dirty = [-1]) {
        const parent_component = current_component;
        set_current_component(component);
        const prop_values = options.props || {};
        const $$ = component.$$ = {
            fragment: null,
            ctx: null,
            // state
            props,
            update: noop,
            not_equal,
            bound: blank_object(),
            // lifecycle
            on_mount: [],
            on_destroy: [],
            before_update: [],
            after_update: [],
            context: new Map(parent_component ? parent_component.$$.context : []),
            // everything else
            callbacks: blank_object(),
            dirty
        };
        let ready = false;
        $$.ctx = instance
            ? instance(component, prop_values, (i, ret, ...rest) => {
                const value = rest.length ? rest[0] : ret;
                if ($$.ctx && not_equal($$.ctx[i], $$.ctx[i] = value)) {
                    if ($$.bound[i])
                        $$.bound[i](value);
                    if (ready)
                        make_dirty(component, i);
                }
                return ret;
            })
            : [];
        $$.update();
        ready = true;
        run_all($$.before_update);
        // `false` as a special case of no DOM component
        $$.fragment = create_fragment ? create_fragment($$.ctx) : false;
        if (options.target) {
            if (options.hydrate) {
                const nodes = children(options.target);
                // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                $$.fragment && $$.fragment.l(nodes);
                nodes.forEach(detach);
            }
            else {
                // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                $$.fragment && $$.fragment.c();
            }
            if (options.intro)
                transition_in(component.$$.fragment);
            mount_component(component, options.target, options.anchor);
            flush();
        }
        set_current_component(parent_component);
    }
    class SvelteComponent {
        $destroy() {
            destroy_component(this, 1);
            this.$destroy = noop;
        }
        $on(type, callback) {
            const callbacks = (this.$$.callbacks[type] || (this.$$.callbacks[type] = []));
            callbacks.push(callback);
            return () => {
                const index = callbacks.indexOf(callback);
                if (index !== -1)
                    callbacks.splice(index, 1);
            };
        }
        $set() {
            // overridden by instance, if it has props
        }
    }

    function dispatch_dev(type, detail) {
        document.dispatchEvent(custom_event(type, Object.assign({ version: '3.20.1' }, detail)));
    }
    function append_dev(target, node) {
        dispatch_dev("SvelteDOMInsert", { target, node });
        append(target, node);
    }
    function insert_dev(target, node, anchor) {
        dispatch_dev("SvelteDOMInsert", { target, node, anchor });
        insert(target, node, anchor);
    }
    function detach_dev(node) {
        dispatch_dev("SvelteDOMRemove", { node });
        detach(node);
    }
    function attr_dev(node, attribute, value) {
        attr(node, attribute, value);
        if (value == null)
            dispatch_dev("SvelteDOMRemoveAttribute", { node, attribute });
        else
            dispatch_dev("SvelteDOMSetAttribute", { node, attribute, value });
    }
    function set_data_dev(text, data) {
        data = '' + data;
        if (text.data === data)
            return;
        dispatch_dev("SvelteDOMSetData", { node: text, data });
        text.data = data;
    }
    function validate_each_argument(arg) {
        if (typeof arg !== 'string' && !(arg && typeof arg === 'object' && 'length' in arg)) {
            let msg = '{#each} only iterates over array-like objects.';
            if (typeof Symbol === 'function' && arg && Symbol.iterator in arg) {
                msg += ' You can use a spread to convert this iterable into an array.';
            }
            throw new Error(msg);
        }
    }
    function validate_slots(name, slot, keys) {
        for (const slot_key of Object.keys(slot)) {
            if (!~keys.indexOf(slot_key)) {
                console.warn(`<${name}> received an unexpected slot "${slot_key}".`);
            }
        }
    }
    class SvelteComponentDev extends SvelteComponent {
        constructor(options) {
            if (!options || (!options.target && !options.$$inline)) {
                throw new Error(`'target' is a required option`);
            }
            super();
        }
        $destroy() {
            super.$destroy();
            this.$destroy = () => {
                console.warn(`Component was already destroyed`); // eslint-disable-line no-console
            };
        }
        $capture_state() { }
        $inject_state() { }
    }

    const subscriber_queue = [];
    /**
     * Create a `Writable` store that allows both updating and reading by subscription.
     * @param {*=}value initial value
     * @param {StartStopNotifier=}start start and stop notifications for subscriptions
     */
    function writable(value, start = noop) {
        let stop;
        const subscribers = [];
        function set(new_value) {
            if (safe_not_equal(value, new_value)) {
                value = new_value;
                if (stop) { // store is ready
                    const run_queue = !subscriber_queue.length;
                    for (let i = 0; i < subscribers.length; i += 1) {
                        const s = subscribers[i];
                        s[1]();
                        subscriber_queue.push(s, value);
                    }
                    if (run_queue) {
                        for (let i = 0; i < subscriber_queue.length; i += 2) {
                            subscriber_queue[i][0](subscriber_queue[i + 1]);
                        }
                        subscriber_queue.length = 0;
                    }
                }
            }
        }
        function update(fn) {
            set(fn(value));
        }
        function subscribe(run, invalidate = noop) {
            const subscriber = [run, invalidate];
            subscribers.push(subscriber);
            if (subscribers.length === 1) {
                stop = start(set) || noop;
            }
            run(value);
            return () => {
                const index = subscribers.indexOf(subscriber);
                if (index !== -1) {
                    subscribers.splice(index, 1);
                }
                if (subscribers.length === 0) {
                    stop();
                    stop = null;
                }
            };
        }
        return { set, update, subscribe };
    }

    const title = writable('...');

    const currentWeather = writable({
        id: 0,
        temp: '-',
        humidity: '',
        windSpeed: ''
    });

    /* src\components\Header.svelte generated by Svelte v3.20.1 */
    const file = "src\\components\\Header.svelte";

    function create_fragment(ctx) {
    	let header;
    	let div1;
    	let div0;
    	let t;

    	const block = {
    		c: function create() {
    			header = element("header");
    			div1 = element("div");
    			div0 = element("div");
    			t = text(/*$title*/ ctx[0]);
    			attr_dev(div0, "class", "w-full text-center text-xl font-bold");
    			add_location(div0, file, 7, 8, 163);
    			attr_dev(div1, "class", "container flex flex-wrap items-center");
    			add_location(div1, file, 5, 4, 100);
    			attr_dev(header, "class", "pt-1 xl:py-4");
    			add_location(header, file, 4, 0, 65);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, header, anchor);
    			append_dev(header, div1);
    			append_dev(div1, div0);
    			append_dev(div0, t);
    		},
    		p: function update(ctx, [dirty]) {
    			if (dirty & /*$title*/ 1) set_data_dev(t, /*$title*/ ctx[0]);
    		},
    		i: noop,
    		o: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(header);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance($$self, $$props, $$invalidate) {
    	let $title;
    	validate_store(title, "title");
    	component_subscribe($$self, title, $$value => $$invalidate(0, $title = $$value));
    	const writable_props = [];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$") console.warn(`<Header> was created with unknown prop '${key}'`);
    	});

    	let { $$slots = {}, $$scope } = $$props;
    	validate_slots("Header", $$slots, []);
    	$$self.$capture_state = () => ({ title, $title });
    	return [$title];
    }

    class Header extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance, create_fragment, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Header",
    			options,
    			id: create_fragment.name
    		});
    	}
    }

    /* src\components\Card.svelte generated by Svelte v3.20.1 */

    const { console: console_1 } = globals;
    const file$1 = "src\\components\\Card.svelte";

    // (63:0) {:else}
    function create_else_block(ctx) {
    	let div9;
    	let div0;
    	let t0;
    	let t1;
    	let img;
    	let img_src_value;
    	let t2;
    	let div1;
    	let t4;
    	let div8;
    	let div4;
    	let div2;
    	let svg0;
    	let path0;
    	let t5;
    	let div3;
    	let t7;
    	let div7;
    	let div5;
    	let svg1;
    	let path1;
    	let t8;
    	let div6;

    	const block = {
    		c: function create() {
    			div9 = element("div");
    			div0 = element("div");
    			t0 = text(/*dayName*/ ctx[1]);
    			t1 = space();
    			img = element("img");
    			t2 = space();
    			div1 = element("div");
    			div1.textContent = "20°";
    			t4 = space();
    			div8 = element("div");
    			div4 = element("div");
    			div2 = element("div");
    			svg0 = svg_element("svg");
    			path0 = svg_element("path");
    			t5 = space();
    			div3 = element("div");
    			div3.textContent = "11°";
    			t7 = space();
    			div7 = element("div");
    			div5 = element("div");
    			svg1 = svg_element("svg");
    			path1 = svg_element("path");
    			t8 = space();
    			div6 = element("div");
    			div6.textContent = "21°";
    			attr_dev(div0, "class", "py-2");
    			add_location(div0, file$1, 64, 8, 2564);
    			attr_dev(img, "class", "h-16 mx-auto");
    			if (img.src !== (img_src_value = "./images/broken_clouds.png")) attr_dev(img, "src", img_src_value);
    			attr_dev(img, "alt", "Nubes rotas");
    			add_location(img, file$1, 65, 8, 2607);
    			attr_dev(div1, "class", "text-lg");
    			add_location(div1, file$1, 66, 8, 2694);
    			attr_dev(path0, "d", "M4.5 7.5c.5-.4 1-.4 1.6 0l3.9 3.8 4-3.8c.4-.4 1-.4 1.5 0 .4.5.4 1.2 0 1.7l-4.7 4.5a1 1 0 01-1.6 0L4.5 9.2c-.4-.5-.4-1.2 0-1.7z");
    			add_location(path0, file$1, 72, 24, 2956);
    			attr_dev(svg0, "class", "h-6 w-6 mx-auto fill-current text-white");
    			attr_dev(svg0, "viewBox", "0 0 20 20");
    			add_location(svg0, file$1, 71, 20, 2857);
    			attr_dev(div2, "class", "w-full");
    			add_location(div2, file$1, 70, 16, 2815);
    			attr_dev(div3, "class", "w-full");
    			add_location(div3, file$1, 75, 16, 3164);
    			attr_dev(div4, "class", "w-1/2");
    			add_location(div4, file$1, 69, 12, 2778);
    			attr_dev(path1, "d", "M15.5 12.5c-.5.4-1 .4-1.6 0L10 8.7l-4 3.8c-.4.4-1 .4-1.5 0-.4-.5-.4-1.2 0-1.7l4.7-4.5a1 1 0 011.6 0l4.7 4.5c.4.5.4 1.2 0 1.7z");
    			add_location(path1, file$1, 80, 24, 3405);
    			attr_dev(svg1, "class", "h-6 w-6 mx-auto fill-current text-white");
    			attr_dev(svg1, "viewBox", "0 0 20 20");
    			add_location(svg1, file$1, 79, 20, 3306);
    			attr_dev(div5, "class", "w-full");
    			add_location(div5, file$1, 78, 16, 3264);
    			attr_dev(div6, "class", "w-full");
    			add_location(div6, file$1, 83, 16, 3612);
    			attr_dev(div7, "class", "w-1/2");
    			add_location(div7, file$1, 77, 12, 3227);
    			attr_dev(div8, "class", "flex flex-wrap");
    			add_location(div8, file$1, 68, 8, 2736);
    			attr_dev(div9, "class", "bg-teal-600 flex-none w-1/2 sm:w-1/3 lg:w-1/4 xl:w-1/6 h-48 mr-6 lg:mr-10 text-white rounded-xl shadow-md");
    			add_location(div9, file$1, 63, 4, 2435);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div9, anchor);
    			append_dev(div9, div0);
    			append_dev(div0, t0);
    			append_dev(div9, t1);
    			append_dev(div9, img);
    			append_dev(div9, t2);
    			append_dev(div9, div1);
    			append_dev(div9, t4);
    			append_dev(div9, div8);
    			append_dev(div8, div4);
    			append_dev(div4, div2);
    			append_dev(div2, svg0);
    			append_dev(svg0, path0);
    			append_dev(div4, t5);
    			append_dev(div4, div3);
    			append_dev(div8, t7);
    			append_dev(div8, div7);
    			append_dev(div7, div5);
    			append_dev(div5, svg1);
    			append_dev(svg1, path1);
    			append_dev(div7, t8);
    			append_dev(div7, div6);
    		},
    		p: function update(ctx, dirty) {
    			if (dirty & /*dayName*/ 2) set_data_dev(t0, /*dayName*/ ctx[1]);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div9);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_else_block.name,
    		type: "else",
    		source: "(63:0) {:else}",
    		ctx
    	});

    	return block;
    }

    // (41:0) {#if isToday}
    function create_if_block(ctx) {
    	let div5;
    	let div0;
    	let t1;
    	let div4;
    	let span0;
    	let t2_value = /*$currentWeather*/ ctx[6].temp + "";
    	let t2;
    	let t3_value = (/*$currentWeather*/ ctx[6].temp !== "-" ? "°" : "") + "";
    	let t3;
    	let t4;
    	let span1;
    	let t5;
    	let t6;
    	let div3;
    	let div1;
    	let t7;
    	let div2;
    	let img;
    	let img_src_value;
    	let div4_class_value;
    	let if_block = /*$currentWeather*/ ctx[6].humidity !== "" && /*$currentWeather*/ ctx[6].windSpeed !== "" && create_if_block_1(ctx);

    	const block = {
    		c: function create() {
    			div5 = element("div");
    			div0 = element("div");
    			div0.textContent = "Hoy";
    			t1 = space();
    			div4 = element("div");
    			span0 = element("span");
    			t2 = text(t2_value);
    			t3 = text(t3_value);
    			t4 = space();
    			span1 = element("span");
    			t5 = text(/*title*/ ctx[2]);
    			t6 = space();
    			div3 = element("div");
    			div1 = element("div");
    			if (if_block) if_block.c();
    			t7 = space();
    			div2 = element("div");
    			img = element("img");
    			attr_dev(div0, "class", "text-center text-gray-800");
    			add_location(div0, file$1, 43, 8, 1464);
    			attr_dev(span0, "class", "text-5xl font-semibold mx-auto py-2");
    			add_location(span0, file$1, 46, 12, 1611);
    			attr_dev(span1, "class", "mx-auto");
    			add_location(span1, file$1, 47, 12, 1745);
    			attr_dev(div1, "class", "w-1/2 flex flex-col text-center pt-8 font-thin");
    			add_location(div1, file$1, 49, 16, 1841);
    			if (img.src !== (img_src_value = `./images/${/*imgToShow*/ ctx[3]}.png`)) attr_dev(img, "src", img_src_value);
    			attr_dev(img, "alt", /*descToSay*/ ctx[4]);
    			add_location(img, file$1, 56, 20, 2291);
    			attr_dev(div2, "class", "w-1/2");
    			add_location(div2, file$1, 55, 16, 2250);
    			attr_dev(div3, "class", "flex flex-wrap");
    			add_location(div3, file$1, 48, 12, 1795);
    			attr_dev(div4, "class", div4_class_value = `${/*bgColor*/ ctx[5]} flex flex-col text-white rounded-xxl shadow-xl`);
    			add_location(div4, file$1, 45, 8, 1524);
    			attr_dev(div5, "class", "container max-w-sm w-full py-6 xs:py-12 xl:py-16 px-4");
    			add_location(div5, file$1, 41, 4, 1385);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div5, anchor);
    			append_dev(div5, div0);
    			append_dev(div5, t1);
    			append_dev(div5, div4);
    			append_dev(div4, span0);
    			append_dev(span0, t2);
    			append_dev(span0, t3);
    			append_dev(div4, t4);
    			append_dev(div4, span1);
    			append_dev(span1, t5);
    			append_dev(div4, t6);
    			append_dev(div4, div3);
    			append_dev(div3, div1);
    			if (if_block) if_block.m(div1, null);
    			append_dev(div3, t7);
    			append_dev(div3, div2);
    			append_dev(div2, img);
    		},
    		p: function update(ctx, dirty) {
    			if (dirty & /*$currentWeather*/ 64 && t2_value !== (t2_value = /*$currentWeather*/ ctx[6].temp + "")) set_data_dev(t2, t2_value);
    			if (dirty & /*$currentWeather*/ 64 && t3_value !== (t3_value = (/*$currentWeather*/ ctx[6].temp !== "-" ? "°" : "") + "")) set_data_dev(t3, t3_value);
    			if (dirty & /*title*/ 4) set_data_dev(t5, /*title*/ ctx[2]);

    			if (/*$currentWeather*/ ctx[6].humidity !== "" && /*$currentWeather*/ ctx[6].windSpeed !== "") {
    				if (if_block) {
    					if_block.p(ctx, dirty);
    				} else {
    					if_block = create_if_block_1(ctx);
    					if_block.c();
    					if_block.m(div1, null);
    				}
    			} else if (if_block) {
    				if_block.d(1);
    				if_block = null;
    			}

    			if (dirty & /*imgToShow*/ 8 && img.src !== (img_src_value = `./images/${/*imgToShow*/ ctx[3]}.png`)) {
    				attr_dev(img, "src", img_src_value);
    			}

    			if (dirty & /*descToSay*/ 16) {
    				attr_dev(img, "alt", /*descToSay*/ ctx[4]);
    			}

    			if (dirty & /*bgColor*/ 32 && div4_class_value !== (div4_class_value = `${/*bgColor*/ ctx[5]} flex flex-col text-white rounded-xxl shadow-xl`)) {
    				attr_dev(div4, "class", div4_class_value);
    			}
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div5);
    			if (if_block) if_block.d();
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block.name,
    		type: "if",
    		source: "(41:0) {#if isToday}",
    		ctx
    	});

    	return block;
    }

    // (51:20) {#if $currentWeather.humidity !== '' && $currentWeather.windSpeed !== ''}
    function create_if_block_1(ctx) {
    	let span0;
    	let t0;
    	let t1_value = /*$currentWeather*/ ctx[6].humidity + "";
    	let t1;
    	let t2;
    	let t3;
    	let span1;
    	let t4;
    	let t5_value = /*$currentWeather*/ ctx[6].windSpeed + "";
    	let t5;
    	let t6;

    	const block = {
    		c: function create() {
    			span0 = element("span");
    			t0 = text("Humedad de ");
    			t1 = text(t1_value);
    			t2 = text("%");
    			t3 = space();
    			span1 = element("span");
    			t4 = text("Vientos de ");
    			t5 = text(t5_value);
    			t6 = text("km/hr");
    			attr_dev(span0, "class", "pt-2");
    			add_location(span0, file$1, 51, 24, 2022);
    			attr_dev(span1, "class", "pt-2");
    			add_location(span1, file$1, 52, 24, 2112);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, span0, anchor);
    			append_dev(span0, t0);
    			append_dev(span0, t1);
    			append_dev(span0, t2);
    			insert_dev(target, t3, anchor);
    			insert_dev(target, span1, anchor);
    			append_dev(span1, t4);
    			append_dev(span1, t5);
    			append_dev(span1, t6);
    		},
    		p: function update(ctx, dirty) {
    			if (dirty & /*$currentWeather*/ 64 && t1_value !== (t1_value = /*$currentWeather*/ ctx[6].humidity + "")) set_data_dev(t1, t1_value);
    			if (dirty & /*$currentWeather*/ 64 && t5_value !== (t5_value = /*$currentWeather*/ ctx[6].windSpeed + "")) set_data_dev(t5, t5_value);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(span0);
    			if (detaching) detach_dev(t3);
    			if (detaching) detach_dev(span1);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block_1.name,
    		type: "if",
    		source: "(51:20) {#if $currentWeather.humidity !== '' && $currentWeather.windSpeed !== ''}",
    		ctx
    	});

    	return block;
    }

    function create_fragment$1(ctx) {
    	let if_block_anchor;

    	function select_block_type(ctx, dirty) {
    		if (/*isToday*/ ctx[0]) return create_if_block;
    		return create_else_block;
    	}

    	let current_block_type = select_block_type(ctx);
    	let if_block = current_block_type(ctx);

    	const block = {
    		c: function create() {
    			if_block.c();
    			if_block_anchor = empty();
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			if_block.m(target, anchor);
    			insert_dev(target, if_block_anchor, anchor);
    		},
    		p: function update(ctx, [dirty]) {
    			if (current_block_type === (current_block_type = select_block_type(ctx)) && if_block) {
    				if_block.p(ctx, dirty);
    			} else {
    				if_block.d(1);
    				if_block = current_block_type(ctx);

    				if (if_block) {
    					if_block.c();
    					if_block.m(if_block_anchor.parentNode, if_block_anchor);
    				}
    			}
    		},
    		i: noop,
    		o: noop,
    		d: function destroy(detaching) {
    			if_block.d(detaching);
    			if (detaching) detach_dev(if_block_anchor);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$1.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$1($$self, $$props, $$invalidate) {
    	let $currentWeather;
    	validate_store(currentWeather, "currentWeather");
    	component_subscribe($$self, currentWeather, $$value => $$invalidate(6, $currentWeather = $$value));
    	let { isToday } = $$props;
    	let { dayName } = $$props;
    	let title = ".";
    	let imgToShow = "unknown";
    	let descToSay = "clima desconocido";
    	let bgColor = "moonlit-asteroid";
    	const writable_props = ["isToday", "dayName"];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$") console_1.warn(`<Card> was created with unknown prop '${key}'`);
    	});

    	let { $$slots = {}, $$scope } = $$props;
    	validate_slots("Card", $$slots, []);

    	$$self.$set = $$props => {
    		if ("isToday" in $$props) $$invalidate(0, isToday = $$props.isToday);
    		if ("dayName" in $$props) $$invalidate(1, dayName = $$props.dayName);
    	};

    	$$self.$capture_state = () => ({
    		currentWeather,
    		isToday,
    		dayName,
    		title,
    		imgToShow,
    		descToSay,
    		bgColor,
    		$currentWeather
    	});

    	$$self.$inject_state = $$props => {
    		if ("isToday" in $$props) $$invalidate(0, isToday = $$props.isToday);
    		if ("dayName" in $$props) $$invalidate(1, dayName = $$props.dayName);
    		if ("title" in $$props) $$invalidate(2, title = $$props.title);
    		if ("imgToShow" in $$props) $$invalidate(3, imgToShow = $$props.imgToShow);
    		if ("descToSay" in $$props) $$invalidate(4, descToSay = $$props.descToSay);
    		if ("bgColor" in $$props) $$invalidate(5, bgColor = $$props.bgColor);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	$$self.$$.update = () => {
    		if ($$self.$$.dirty & /*$currentWeather*/ 64) {
    			 if ($currentWeather.id !== 0) {
    				let firstDigit = [];
    				$currentWeather.id.toString().split("").forEach(d => firstDigit.push(d));

    				fetch(`https://erianvc.github.io/API/weather-app/data/group${firstDigit[0]}xx.json`).then(res => res.json()).then(data => {
    					data.forEach(the => {
    						if (the.id === $currentWeather.id) {
    							$$invalidate(2, title = the.title);
    							$$invalidate(3, imgToShow = the.image);
    							$$invalidate(4, descToSay = the.description);
    						}
    					});
    				}).catch(err => console.log(err));
    			}
    		}

    		if ($$self.$$.dirty & /*$currentWeather*/ 64) {
    			 if ($currentWeather.temp !== "-") {
    				$currentWeather.temp > 35
    				? $$invalidate(5, bgColor = "flare")
    				: null;

    				$currentWeather.temp > 25 && $currentWeather.temp < 36
    				? $$invalidate(5, bgColor = "blooker-20")
    				: null;

    				$currentWeather.temp > 10 && $currentWeather.temp < 26
    				? $$invalidate(5, bgColor = "blue-sky")
    				: null;

    				$currentWeather.temp < 11
    				? $$invalidate(5, bgColor = "cool-sky")
    				: null;
    			}
    		}
    	};

    	return [isToday, dayName, title, imgToShow, descToSay, bgColor, $currentWeather];
    }

    class Card extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$1, create_fragment$1, safe_not_equal, { isToday: 0, dayName: 1 });

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Card",
    			options,
    			id: create_fragment$1.name
    		});

    		const { ctx } = this.$$;
    		const props = options.props || {};

    		if (/*isToday*/ ctx[0] === undefined && !("isToday" in props)) {
    			console_1.warn("<Card> was created without expected prop 'isToday'");
    		}

    		if (/*dayName*/ ctx[1] === undefined && !("dayName" in props)) {
    			console_1.warn("<Card> was created without expected prop 'dayName'");
    		}
    	}

    	get isToday() {
    		throw new Error("<Card>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set isToday(value) {
    		throw new Error("<Card>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get dayName() {
    		throw new Error("<Card>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set dayName(value) {
    		throw new Error("<Card>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    /* src\components\Next-5-Days.svelte generated by Svelte v3.20.1 */
    const file$2 = "src\\components\\Next-5-Days.svelte";

    function get_each_context(ctx, list, i) {
    	const child_ctx = ctx.slice();
    	child_ctx[5] = list[i];
    	child_ctx[7] = i;
    	return child_ctx;
    }

    // (32:8) {#each Array(5) as item, i}
    function create_each_block(ctx) {
    	let current;

    	const card = new Card({
    			props: {
    				isToday: false,
    				dayName: /*next5DaysNames*/ ctx[0][/*i*/ ctx[7]]
    			},
    			$$inline: true
    		});

    	const block = {
    		c: function create() {
    			create_component(card.$$.fragment);
    		},
    		m: function mount(target, anchor) {
    			mount_component(card, target, anchor);
    			current = true;
    		},
    		p: noop,
    		i: function intro(local) {
    			if (current) return;
    			transition_in(card.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(card.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(card, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_each_block.name,
    		type: "each",
    		source: "(32:8) {#each Array(5) as item, i}",
    		ctx
    	});

    	return block;
    }

    function create_fragment$2(ctx) {
    	let div2;
    	let div0;
    	let t1;
    	let div1;
    	let current;
    	let each_value = Array(5);
    	validate_each_argument(each_value);
    	let each_blocks = [];

    	for (let i = 0; i < each_value.length; i += 1) {
    		each_blocks[i] = create_each_block(get_each_context(ctx, each_value, i));
    	}

    	const out = i => transition_out(each_blocks[i], 1, 1, () => {
    		each_blocks[i] = null;
    	});

    	const block = {
    		c: function create() {
    			div2 = element("div");
    			div0 = element("div");
    			div0.textContent = "Próximamente";
    			t1 = space();
    			div1 = element("div");

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].c();
    			}

    			attr_dev(div0, "class", "py-3 text-center text-lg font-bold");
    			add_location(div0, file$2, 27, 4, 740);
    			attr_dev(div1, "class", "flex flex-no-wrap flex-row overflow-scroll overflow-y-hidden pb-2 xs:pb-4 text-center svelte-qod59t");
    			add_location(div1, file$2, 29, 4, 814);
    			attr_dev(div2, "class", "container px-4 sm:px-8 lg:px-24");
    			add_location(div2, file$2, 25, 0, 687);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div2, anchor);
    			append_dev(div2, div0);
    			append_dev(div2, t1);
    			append_dev(div2, div1);

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].m(div1, null);
    			}

    			current = true;
    		},
    		p: function update(ctx, [dirty]) {
    			if (dirty & /*next5DaysNames*/ 1) {
    				each_value = Array(5);
    				validate_each_argument(each_value);
    				let i;

    				for (i = 0; i < each_value.length; i += 1) {
    					const child_ctx = get_each_context(ctx, each_value, i);

    					if (each_blocks[i]) {
    						each_blocks[i].p(child_ctx, dirty);
    						transition_in(each_blocks[i], 1);
    					} else {
    						each_blocks[i] = create_each_block(child_ctx);
    						each_blocks[i].c();
    						transition_in(each_blocks[i], 1);
    						each_blocks[i].m(div1, null);
    					}
    				}

    				group_outros();

    				for (i = each_value.length; i < each_blocks.length; i += 1) {
    					out(i);
    				}

    				check_outros();
    			}
    		},
    		i: function intro(local) {
    			if (current) return;

    			for (let i = 0; i < each_value.length; i += 1) {
    				transition_in(each_blocks[i]);
    			}

    			current = true;
    		},
    		o: function outro(local) {
    			each_blocks = each_blocks.filter(Boolean);

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				transition_out(each_blocks[i]);
    			}

    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div2);
    			destroy_each(each_blocks, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$2.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$2($$self, $$props, $$invalidate) {
    	const weekDays = ["Domingo", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"];
    	const day = new Date();
    	const todayNumber = day.getDay();
    	const next5DaysNames = getNext5DaysNames();

    	function getNext5DaysNames() {
    		let result = [];

    		for (let i = todayNumber + 1; i < todayNumber + 6; i++) {
    			if (i > 6) {
    				const dayName = weekDays[i - 7];
    				result.push(dayName);
    			} else {
    				const dayName = weekDays[i];
    				result.push(dayName);
    			}
    		}

    		return result;
    	}

    	const writable_props = [];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$") console.warn(`<Next_5_Days> was created with unknown prop '${key}'`);
    	});

    	let { $$slots = {}, $$scope } = $$props;
    	validate_slots("Next_5_Days", $$slots, []);

    	$$self.$capture_state = () => ({
    		Card,
    		weekDays,
    		day,
    		todayNumber,
    		next5DaysNames,
    		getNext5DaysNames
    	});

    	return [next5DaysNames];
    }

    class Next_5_Days extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$2, create_fragment$2, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Next_5_Days",
    			options,
    			id: create_fragment$2.name
    		});
    	}
    }

    /* src\App.svelte generated by Svelte v3.20.1 */

    function create_fragment$3(ctx) {
    	let t0;
    	let t1;
    	let current;
    	const header = new Header({ $$inline: true });

    	const card = new Card({
    			props: { isToday: true, dayName: null },
    			$$inline: true
    		});

    	const next5days = new Next_5_Days({ $$inline: true });

    	const block = {
    		c: function create() {
    			create_component(header.$$.fragment);
    			t0 = space();
    			create_component(card.$$.fragment);
    			t1 = space();
    			create_component(next5days.$$.fragment);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			mount_component(header, target, anchor);
    			insert_dev(target, t0, anchor);
    			mount_component(card, target, anchor);
    			insert_dev(target, t1, anchor);
    			mount_component(next5days, target, anchor);
    			current = true;
    		},
    		p: noop,
    		i: function intro(local) {
    			if (current) return;
    			transition_in(header.$$.fragment, local);
    			transition_in(card.$$.fragment, local);
    			transition_in(next5days.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(header.$$.fragment, local);
    			transition_out(card.$$.fragment, local);
    			transition_out(next5days.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(header, detaching);
    			if (detaching) detach_dev(t0);
    			destroy_component(card, detaching);
    			if (detaching) detach_dev(t1);
    			destroy_component(next5days, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$3.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$3($$self, $$props, $$invalidate) {
    	const writable_props = [];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$") console.warn(`<App> was created with unknown prop '${key}'`);
    	});

    	let { $$slots = {}, $$scope } = $$props;
    	validate_slots("App", $$slots, []);
    	$$self.$capture_state = () => ({ currentWeather, Header, Card, Next5Days: Next_5_Days });
    	return [];
    }

    class App extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$3, create_fragment$3, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "App",
    			options,
    			id: create_fragment$3.name
    		});
    	}
    }

    const currentPositionOptions = {
        enableHighAccuracy: false, 
        maximumAge        : 30000, 
        timeout           : 3000,
    };



    startApp();



    async function startApp() {

        if('geolocation' in navigator) {

            getPosition();
        } else {

            console.warn('No hay geolocalización disponible');
            errorGeolocation();
        }
    }


    function getPosition() {

        navigator.geolocation.getCurrentPosition(successGeolocation, errorGeolocation, currentPositionOptions);

        async function successGeolocation(position) {

            let weatherInfo = await getWeather(position.coords.latitude, position.coords.longitude);
            updateTitleStore(`${weatherInfo.name}, ${weatherInfo.sys.country}`);
            updateCurrentWeatherStore(weatherInfo);
        }
    }


    async function errorGeolocation() {

        let latlng = await getIpClient().then( res => res.loc.split(',') );
        let weatherInfo = await getWeather(latlng[0].trim(), latlng[1].trim());
        updateTitleStore(`${weatherInfo.name}, ${weatherInfo.sys.country}`);
        updateCurrentWeatherStore(weatherInfo);
    }


    async function getIpClient() {

        let response = await fetch('/.netlify/functions/ipclient').then(res => res.json());
        return response
    }


    async function getWeather(lat, lon) {
        return await fetch(`/.netlify/functions/weather?lat=${lat}&lon=${lon}`).then(res => res.json())
    }


    function updateTitleStore(newTitle) {
        title.update(n => n = newTitle);
    }


    function updateCurrentWeatherStore(data) {

        let theWather = {
            id: data.weather[0].id,
            temp: data.main.temp,
            humidity: data.main.humidity,
            windSpeed: data.wind.speed,
        };

        currentWeather.update(n => n = theWather);
    }


    const app = new App({
    	target: document.body,
    });

    return app;

}());
//# sourceMappingURL=bundle.js.map
