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
			private _waitingTime: number = 0;

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
				var dfd: JQueryDeferred<any>;
				var promise: JQueryPromise<any>;
				// Type like JQueryDeferred
				if (isJQueryPromiseLikeObject(result)) {
					promise = result.promise();
				// Type Another
				} else {
					dfd = $.Deferred<any>();
					setTimeout( (): void => {
						dfd.resolve(result);
					}, this._waitingTime);
					// clear waiting time
					this._waitingTime = 0;
					// promised
					promise = dfd.promise();
				}
				promise.done( (doneResult: any): void => {
					this._index += 1;
					if (this._index !== this._tasks.length) {
						this.act(doneResult, isLoop);
					}
				});
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
