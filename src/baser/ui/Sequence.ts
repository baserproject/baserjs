module baser {

	export module ui {

		/**
		 * 非同期逐次処理クラス
		 *
		 * @version 0.4.0
		 * @since 0.4.0
		 *
		 */
		export class Sequence {

			private _tasks: Task[] = [];
			private _index: number = 0;
			private _promise: JQueryPromise<any> = null;
			private _resolver: JQueryDeferred<any> = null;
			private _waitingTime: number = 0;
			private _waitTimer: number = 0;
			private _toExit: boolean = false;

			constructor (tasks: Function[]) {
				var i: number = 0;
				var l: number = tasks.length;
				for (; i < l; i++) {
					this._tasks.push(new Task(tasks[i]));
				}
			}

			// TODO: ネイティブのPromiseを使う
			public act (value: any, isLoop: boolean = false): Sequence {
				var task: Task = this._tasks[this._index];
				var result: any = task.act(this, this._index, value);

				// Type like JQueryDeferred
				if (isJQueryPromiseLikeObject(result)) {
					this._promise = result.promise();
				// Type Another
				} else {
					this._resolver = $.Deferred<any>();
					this._waitTimer = setTimeout( (): void => {
						console.log('resolve');
						this._resolver.resolve(result);
					}, this._waitingTime);
					console.log('promise');
					// promised
					this._promise = this._resolver.promise();
				}
				this._promise.done( (doneResult: any): void => {
						console.log('done');
					this._index += 1;
					if (this._index < this._tasks.length || isLoop) {
						this.act(doneResult, isLoop);
					}
				}).fail( (): void => {

					console.warn('failed');

				}).always( (): void => {
						console.log('always');
					clearTimeout(this._waitTimer);
					this._promise = null;
					this._resolver = null;
					this._waitTimer = null;
					this._waitingTime = 0;
				});
				return this;
			}

			public loop (value: any): Sequence {
				return this.act(value, true);
			}

			public exit (): Sequence {
				this._toExit = true;
				if (this._waitTimer) {
					this._resolver.reject();
				}
				return this;
			}

			public wait (watingTime: number): void {
				this._waitingTime = watingTime;
			}

		}

		class Task {

			public status: TaskState;
			private _func: Function;

			constructor (func: Function) {
				this.status = TaskState.yet;
				this._func = func;
			}

			public act (sequence: Sequence, sequenceIndex: number, value: any): any {
				var result: any = this._func.call(sequence, sequenceIndex, value);
				this.status = TaskState.done;
				return result;
			}

		}

		enum TaskState {
			done,
			yet
		}

		function isJQueryPromiseLikeObject (object: any): boolean {
			var props: string[] = [
				'always',
				'done',
				'fail',
				'pipe',
				'progress',
				'promise',
				'state',
				'then'
			];
			if (object instanceof jQuery) {
				return !!object.promise;
			} else {
				while (props.length) {
					if (!(props.shift() in Object(object))) {
						return false;
					}
				}
				return true;
			}
		}

	}

}
