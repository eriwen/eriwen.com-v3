package org.eriwen.gradle

import org.gradle.api.DefaultTask
import org.gradle.api.tasks.TaskAction

import com.google.javascript.jscomp.CommandLineRunner
import com.google.javascript.jscomp.CompilationLevel
import com.google.javascript.jscomp.Compiler
import com.google.javascript.jscomp.CompilerOptions
import com.google.javascript.jscomp.JSSourceFile
import com.google.javascript.jscomp.Result
import com.google.javascript.jscomp.WarningLevel

class MinifyJs extends DefaultTask {
	def options = new CompilerOptions()
	def compilationLevel = 'SIMPLE_OPTIMIZATIONS'
	def warningLevel = 'DEFAULT'
	def inputFiles
	def outputFile

	@TaskAction
	def run() {
		Compiler compiler = new Compiler()
		CompilerOptions options = new CompilerOptions()
		CompilationLevel.valueOf(compilationLevel).setOptionsForCompilationLevel(options)
		WarningLevel level = WarningLevel.valueOf(warningLevel)
		level.setOptionsForWarningLevel(options)
		List<JSSourceFile> externs = CommandLineRunner.getDefaultExterns()
		List<JSSourceFile> inputs = inputFiles.collect {
			JSSourceFile.fromFile(it)
		} as ArrayList<JSSourceFile>
		Result result = compiler.compile(externs, inputs, options)
		if (result.success) {
			new File(outputFile).write(compiler.toSource())
		} else {
			result.errors.each {
				println "${it.sourceName}:${it.lineNumber} - ${it.description}"
			}
		}
	}
}
